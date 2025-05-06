import React, { useState, useEffect } from 'react'
import {
  Container, Card, Header, Title,
  Content, Form, Input, Select,
  Button, List, ListItem, ActionGroup
} from './adminStyles'

const backendUrl = import.meta.env.VITE_API_URL


interface Court { id: number; name: string; type: string }

const AdminScreen: React.FC = () => {
  const [courts, setCourts] = useState<Court[]>([])
  const [name, setName] = useState('')
  const [type, setType] = useState('Futsal')
  const [editing, setEditing] = useState<Court | null>(null)
  const token = localStorage.getItem('token')

  const load = () => {
    fetch(`${backendUrl}/quadras`, { headers: { Authorization: `Bearer ${token}` } })
      .then(r => r.json()).then(setCourts)
  }
  useEffect(load, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const method = editing ? 'PUT' : 'POST'
    const url = editing
      ? `${backendUrl}/quadras/${editing.id}`
      : `${backendUrl}/quadras`
    const res = await fetch(url, {
      method, headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ name, type })
    })
    if (!res.ok) return alert('Erro ao salvar')
    setName(''); setType('Futsal'); setEditing(null)
    load()
  }

  const handleEdit = (c: Court) => {
    setEditing(c); setName(c.name); setType(c.type)
  }
  const handleDelete = async (id: number) => {
    if (!confirm('Excluir quadra?')) return
    await fetch(`${backendUrl}/quadras/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` }
    })
    load()
  }

  return (
    <Container>
      <Card>
        <Header><Title>Administração de Quadras</Title></Header>
        <Content>
          <Form onSubmit={handleSubmit}>
            <label>Nome</label>
            <Input value={name} onChange={e => setName(e.target.value)} required />
            <label>Tipo</label>
            <Select value={type} onChange={e => setType(e.target.value)}>
              <option>Futsal</option>
              <option>Vôlei</option>
              <option>Basquete</option>
            </Select>
            <Button type="submit">{editing ? 'Atualizar' : 'Cadastrar'}</Button>
          </Form>
          <List>
            {courts.map(c => (
              <ListItem key={c.id}>
                {c.name} — {c.type}
                <ActionGroup>
                  <Button onClick={() => handleEdit(c)}>✏️</Button>
                  <Button onClick={() => handleDelete(c.id)}>🗑️</Button>
                </ActionGroup>
              </ListItem>
            ))}
          </List>
        </Content>
      </Card>
    </Container>
  )
}
export default AdminScreen
