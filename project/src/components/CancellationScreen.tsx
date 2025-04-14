import React from 'react';
import { Calendar, Clock, XCircle, AlertCircle } from 'lucide-react';

interface CancellationScreenProps {
  onNavigate: (screen: string) => void;
  user: any;
}

const CancellationScreen: React.FC<CancellationScreenProps> = ({ onNavigate, user }) => {
  const reservations = [
    {
      id: 1,
      date: '15/03/2024',
      time: '14:00 - 15:00',
      court: 'Quadra 1 - Futsal',
      canCancel: true,
    },
    {
      id: 2,
      date: '20/03/2024',
      time: '16:00 - 17:00',
      court: 'Quadra 2 - Vôlei',
      canCancel: true,
    },
  ];

  const handleCancel = (id: number) => {
    // Handle cancellation logic here
    alert('Reserva cancelada com sucesso!');
  };

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl p-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Minhas Reservas</h2>
          <button
            onClick={() => onNavigate('booking')}
            className="px-4 py-2 text-sm font-medium text-indigo-600 hover:text-indigo-500"
          >
            Nova Reserva
          </button>
        </div>

        <div className="space-y-4">
          {reservations.map((reservation) => (
            <div
              key={reservation.id}
              className="border border-gray-200 rounded-lg p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <Calendar className="w-5 h-5 text-gray-500" />
                  <span className="font-medium">{reservation.date}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-5 h-5 text-gray-500" />
                  <span>{reservation.time}</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">{reservation.court}</h3>
                  {!reservation.canCancel && (
                    <div className="flex items-center mt-2 text-sm text-amber-600">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      Cancelamento indisponível (menos de 24h)
                    </div>
                  )}
                </div>
                
                <button
                  onClick={() => handleCancel(reservation.id)}
                  disabled={!reservation.canCancel}
                  className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium ${
                    reservation.canCancel
                      ? 'text-red-600 hover:bg-red-50'
                      : 'text-gray-400 cursor-not-allowed'
                  }`}
                >
                  <XCircle className="w-4 h-4 mr-2" />
                  Cancelar
                </button>
              </div>
            </div>
          ))}
        </div>

        {reservations.length === 0 && (
          <div className="text-center py-12">
            <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <Calendar className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900">
              Nenhuma reserva encontrada
            </h3>
            <p className="mt-1 text-gray-500">
              Você ainda não tem nenhuma reserva agendada.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CancellationScreen;