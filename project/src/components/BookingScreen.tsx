import React, { useState } from 'react';
import { Calendar, Clock, ChevronLeft, ChevronRight } from 'lucide-react';

interface BookingScreenProps {
  onNavigate: (screen: string) => void;
  user: any;
}

const BookingScreen: React.FC<BookingScreenProps> = ({ onNavigate, user }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedCourt, setSelectedCourt] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);

  const courts = [
    { id: 1, name: 'Quadra 1', type: 'Futsal' },
    { id: 2, name: 'Quadra 2', type: 'Vôlei' },
    { id: 3, name: 'Quadra 3', type: 'Basquete' },
  ];

  const timeSlots = [
    '08:00', '09:00', '10:00', '11:00', '12:00',
    '13:00', '14:00', '15:00', '16:00', '17:00',
    '18:00', '19:00', '20:00', '21:00'
  ];

  const handleBooking = () => {
    onNavigate('confirmation');
  };

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Agendar Quadra</h2>
          <div className="flex items-center space-x-2">
            <Calendar className="w-6 h-6 text-indigo-600" />
            <span className="text-gray-600">
              {selectedDate.toLocaleDateString('pt-BR')}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Selecione a Quadra</h3>
            <div className="space-y-3">
              {courts.map((court) => (
                <button
                  key={court.id}
                  onClick={() => setSelectedCourt(court)}
                  className={`w-full p-4 rounded-lg border ${
                    selectedCourt?.id === court.id
                      ? 'border-indigo-600 bg-indigo-50'
                      : 'border-gray-200 hover:border-indigo-300'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-medium">{court.name}</h4>
                      <p className="text-sm text-gray-500">{court.type}</p>
                    </div>
                    {selectedCourt?.id === court.id && (
                      <div className="w-4 h-4 rounded-full bg-indigo-600"></div>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Horários Disponíveis</h3>
            <div className="grid grid-cols-3 gap-2">
              {timeSlots.map((time) => (
                <button
                  key={time}
                  onClick={() => setSelectedTime(time)}
                  className={`p-2 rounded-lg text-center ${
                    selectedTime === time
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-100 hover:bg-gray-200'
                  }`}
                >
                  {time}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-end">
          <button
            onClick={handleBooking}
            disabled={!selectedCourt || !selectedTime}
            className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Confirmar Agendamento
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingScreen;