import React from 'react';
import { CheckCircle, Calendar, Clock, MapPin } from 'lucide-react';

interface ConfirmationScreenProps {
  onNavigate: (screen: string) => void;
  user: any;
}

const ConfirmationScreen: React.FC<ConfirmationScreenProps> = ({ onNavigate, user }) => {
  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-lg w-full">
        <div className="text-center mb-8">
          <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
            <CheckCircle className="w-10 h-10 text-green-500" />
          </div>
          <h2 className="mt-4 text-2xl font-bold text-gray-900">Reserva Confirmada!</h2>
          <p className="mt-2 text-gray-600">
            Um email de confirmação foi enviado para {user?.email}
          </p>
        </div>

        <div className="space-y-4 mb-8">
          <div className="flex items-center p-4 bg-gray-50 rounded-lg">
            <Calendar className="w-6 h-6 text-gray-500 mr-3" />
            <div>
              <p className="text-sm text-gray-500">Data</p>
              <p className="font-medium">15 de Março, 2024</p>
            </div>
          </div>

          <div className="flex items-center p-4 bg-gray-50 rounded-lg">
            <Clock className="w-6 h-6 text-gray-500 mr-3" />
            <div>
              <p className="text-sm text-gray-500">Horário</p>
              <p className="font-medium">14:00 - 15:00</p>
            </div>
          </div>

          <div className="flex items-center p-4 bg-gray-50 rounded-lg">
            <MapPin className="w-6 h-6 text-gray-500 mr-3" />
            <div>
              <p className="text-sm text-gray-500">Quadra</p>
              <p className="font-medium">Quadra 1 - Futsal</p>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <button
            onClick={() => onNavigate('booking')}
            className="w-full py-3 px-4 border border-transparent rounded-lg text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
          >
            Fazer Nova Reserva
          </button>
          
          <button
            onClick={() => onNavigate('cancellation')}
            className="w-full py-3 px-4 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Gerenciar Reservas
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationScreen;