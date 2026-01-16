'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import {
  Car,
  FileText,
  AlertTriangle,
  CheckCircle,
  Edit3,
  Save,
  X,
  Loader2,
  Fuel,
  Gauge,
  Shield,
  Wrench,
  Camera,
  Plus,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface Vehicle {
  id: string;
  driver_id: string;
  make: string;
  model: string;
  year: number;
  color: string;
  license_plate: string;
  vin: string | null;
  insurance_expiry: string | null;
  registration_expiry: string | null;
  last_inspection: string | null;
  mileage: number | null;
  fuel_type: string;
  status: string;
  created_at: string;
}

export default function MyVehiclePage() {
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [vehicle, setVehicle] = useState<Vehicle | null>(null);
  const [hasVehicle, setHasVehicle] = useState(true);

  // Form states
  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [year, setYear] = useState('');
  const [color, setColor] = useState('');
  const [licensePlate, setLicensePlate] = useState('');
  const [vin, setVin] = useState('');
  const [mileage, setMileage] = useState('');
  const [fuelType, setFuelType] = useState('gasoline');

  useEffect(() => {
    const fetchVehicle = async () => {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();

      if (user) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const { data: vehicleData } = await (supabase as any)
          .from('vehicles')
          .select('*')
          .eq('driver_id', user.id)
          .single() as { data: Vehicle | null };

        if (vehicleData) {
          setVehicle(vehicleData);
          setMake(vehicleData.make || '');
          setModel(vehicleData.model || '');
          setYear(vehicleData.year?.toString() || '');
          setColor(vehicleData.color || '');
          setLicensePlate(vehicleData.license_plate || '');
          setVin(vehicleData.vin || '');
          setMileage(vehicleData.mileage?.toString() || '');
          setFuelType(vehicleData.fuel_type || 'gasoline');
        } else {
          setHasVehicle(false);
        }
      }
      setLoading(false);
    };

    fetchVehicle();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    const vehicleData = {
      make,
      model,
      year: parseInt(year),
      color,
      license_plate: licensePlate,
      vin: vin || null,
      mileage: mileage ? parseInt(mileage) : null,
      fuel_type: fuelType,
      updated_at: new Date().toISOString(),
    };

    let error;

    if (vehicle) {
      // Update existing
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const result = await (supabase as any)
        .from('vehicles')
        .update(vehicleData)
        .eq('id', vehicle.id);
      error = result.error;
    } else {
      // Create new
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const result = await (supabase as any)
        .from('vehicles')
        .insert({
          ...vehicleData,
          driver_id: user?.id,
          status: 'active',
        })
        .select()
        .single();
      error = result.error;
      if (!error && result.data) {
        setVehicle(result.data);
        setHasVehicle(true);
      }
    }

    setSaving(false);

    if (!error) {
      setSaved(true);
      setEditing(false);
      setTimeout(() => setSaved(false), 3000);
    }
  };

  const cancelEdit = () => {
    if (vehicle) {
      setMake(vehicle.make || '');
      setModel(vehicle.model || '');
      setYear(vehicle.year?.toString() || '');
      setColor(vehicle.color || '');
      setLicensePlate(vehicle.license_plate || '');
      setVin(vehicle.vin || '');
      setMileage(vehicle.mileage?.toString() || '');
      setFuelType(vehicle.fuel_type || 'gasoline');
    }
    setEditing(false);
  };

  const isExpiringSoon = (dateStr: string | null) => {
    if (!dateStr) return false;
    const date = new Date(dateStr);
    const today = new Date();
    const diffDays = Math.ceil((date.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    return diffDays <= 30 && diffDays > 0;
  };

  const isExpired = (dateStr: string | null) => {
    if (!dateStr) return false;
    return new Date(dateStr) < new Date();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-am-navy dark:text-am-orange" />
      </div>
    );
  }

  // No vehicle registered
  if (!hasVehicle && !editing) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Mi Vehiculo</h1>
          <p className="text-gray-500 dark:text-gray-400">Registra y administra tu vehiculo</p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-12 text-center">
          <Car className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            No tienes un vehiculo registrado
          </h3>
          <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-md mx-auto">
            Registra tu vehiculo para poder recibir asignaciones de entregas y comenzar a ganar dinero.
          </p>
          <button
            onClick={() => setEditing(true)}
            className="inline-flex items-center gap-2 px-6 py-3 bg-am-navy dark:bg-am-orange text-white rounded-lg font-semibold hover:bg-am-navy-light dark:hover:bg-am-orange-light transition-colors"
          >
            <Plus className="w-5 h-5" />
            Registrar Vehiculo
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Mi Vehiculo</h1>
          <p className="text-gray-500 dark:text-gray-400">
            {vehicle ? `${vehicle.make} ${vehicle.model} ${vehicle.year}` : 'Registra tu vehiculo'}
          </p>
        </div>
        <div className="flex items-center gap-2">
          {saved && (
            <div className="flex items-center gap-2 text-am-green mr-2">
              <CheckCircle className="w-5 h-5" />
              <span className="font-medium">Guardado</span>
            </div>
          )}
          {!editing ? (
            <button
              onClick={() => setEditing(true)}
              className="flex items-center gap-2 px-4 py-2 bg-am-navy dark:bg-am-orange text-white rounded-lg font-medium hover:bg-am-navy-light dark:hover:bg-am-orange-light transition-colors"
            >
              <Edit3 className="w-4 h-4" />
              Editar
            </button>
          ) : (
            <>
              <button
                onClick={cancelEdit}
                className="flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <X className="w-4 h-4" />
                Cancelar
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="flex items-center gap-2 px-4 py-2 bg-am-green text-white rounded-lg font-medium hover:bg-am-green-light transition-colors disabled:opacity-50"
              >
                {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                Guardar
              </button>
            </>
          )}
        </div>
      </div>

      {/* Vehicle Card */}
      {vehicle && !editing && (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
          <div className="h-48 bg-gradient-to-br from-am-navy via-am-navy-light to-am-green flex items-center justify-center">
            <div className="text-center text-white">
              <Car className="w-16 h-16 mx-auto mb-2" />
              <p className="text-2xl font-bold">{vehicle.make} {vehicle.model}</p>
              <p className="text-lg opacity-80">{vehicle.year} - {vehicle.color}</p>
            </div>
          </div>
          <div className="p-6">
            <div className="flex items-center justify-center gap-4 -mt-10 relative z-10">
              <div className="bg-white dark:bg-gray-700 rounded-lg px-6 py-3 shadow-lg border border-gray-200 dark:border-gray-600">
                <p className="text-2xl font-bold text-am-navy dark:text-am-orange tracking-wider">
                  {vehicle.license_plate}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 text-center">Placa</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Vehicle Details Form/Display */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
        <div className="p-6 border-b border-gray-100 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
            <Car className="w-5 h-5" />
            Informacion del Vehiculo
          </h2>
        </div>
        <div className="p-6">
          <div className="grid gap-6 md:grid-cols-2">
            {/* Make */}
            <div>
              <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1.5">
                Marca
              </label>
              {editing ? (
                <input
                  type="text"
                  value={make}
                  onChange={(e) => setMake(e.target.value)}
                  className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-am-navy dark:focus:ring-am-orange text-gray-900 dark:text-white"
                  placeholder="Toyota, Ford, Honda..."
                />
              ) : (
                <p className="text-gray-900 dark:text-white font-medium">{vehicle?.make || 'N/A'}</p>
              )}
            </div>

            {/* Model */}
            <div>
              <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1.5">
                Modelo
              </label>
              {editing ? (
                <input
                  type="text"
                  value={model}
                  onChange={(e) => setModel(e.target.value)}
                  className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-am-navy dark:focus:ring-am-orange text-gray-900 dark:text-white"
                  placeholder="Camry, F-150, Civic..."
                />
              ) : (
                <p className="text-gray-900 dark:text-white font-medium">{vehicle?.model || 'N/A'}</p>
              )}
            </div>

            {/* Year */}
            <div>
              <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1.5">
                Ano
              </label>
              {editing ? (
                <input
                  type="number"
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-am-navy dark:focus:ring-am-orange text-gray-900 dark:text-white"
                  placeholder="2023"
                  min="1990"
                  max="2027"
                />
              ) : (
                <p className="text-gray-900 dark:text-white font-medium">{vehicle?.year || 'N/A'}</p>
              )}
            </div>

            {/* Color */}
            <div>
              <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1.5">
                Color
              </label>
              {editing ? (
                <input
                  type="text"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-am-navy dark:focus:ring-am-orange text-gray-900 dark:text-white"
                  placeholder="Blanco, Negro, Gris..."
                />
              ) : (
                <p className="text-gray-900 dark:text-white font-medium">{vehicle?.color || 'N/A'}</p>
              )}
            </div>

            {/* License Plate */}
            <div>
              <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1.5">
                Placa
              </label>
              {editing ? (
                <input
                  type="text"
                  value={licensePlate}
                  onChange={(e) => setLicensePlate(e.target.value.toUpperCase())}
                  className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-am-navy dark:focus:ring-am-orange text-gray-900 dark:text-white uppercase"
                  placeholder="ABC-1234"
                />
              ) : (
                <p className="text-gray-900 dark:text-white font-medium">{vehicle?.license_plate || 'N/A'}</p>
              )}
            </div>

            {/* VIN */}
            <div>
              <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1.5">
                VIN (opcional)
              </label>
              {editing ? (
                <input
                  type="text"
                  value={vin}
                  onChange={(e) => setVin(e.target.value.toUpperCase())}
                  className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-am-navy dark:focus:ring-am-orange text-gray-900 dark:text-white uppercase"
                  placeholder="1HGBH41JXMN109186"
                />
              ) : (
                <p className="text-gray-900 dark:text-white font-medium">{vehicle?.vin || 'No registrado'}</p>
              )}
            </div>

            {/* Mileage */}
            <div>
              <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1.5 flex items-center gap-2">
                <Gauge className="w-4 h-4" />
                Millaje
              </label>
              {editing ? (
                <input
                  type="number"
                  value={mileage}
                  onChange={(e) => setMileage(e.target.value)}
                  className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-am-navy dark:focus:ring-am-orange text-gray-900 dark:text-white"
                  placeholder="50000"
                />
              ) : (
                <p className="text-gray-900 dark:text-white font-medium">
                  {vehicle?.mileage ? `${vehicle.mileage.toLocaleString()} mi` : 'No registrado'}
                </p>
              )}
            </div>

            {/* Fuel Type */}
            <div>
              <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1.5 flex items-center gap-2">
                <Fuel className="w-4 h-4" />
                Tipo de Combustible
              </label>
              {editing ? (
                <select
                  value={fuelType}
                  onChange={(e) => setFuelType(e.target.value)}
                  className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-am-navy dark:focus:ring-am-orange text-gray-900 dark:text-white"
                >
                  <option value="gasoline">Gasolina</option>
                  <option value="diesel">Diesel</option>
                  <option value="electric">Electrico</option>
                  <option value="hybrid">Hibrido</option>
                </select>
              ) : (
                <p className="text-gray-900 dark:text-white font-medium capitalize">
                  {vehicle?.fuel_type === 'gasoline' ? 'Gasolina' :
                   vehicle?.fuel_type === 'diesel' ? 'Diesel' :
                   vehicle?.fuel_type === 'electric' ? 'Electrico' :
                   vehicle?.fuel_type === 'hybrid' ? 'Hibrido' : 'N/A'}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Documents Status - Only show if vehicle exists */}
      {vehicle && !editing && (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="p-6 border-b border-gray-100 dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Documentos del Vehiculo
            </h2>
          </div>
          <div className="p-6">
            <div className="grid gap-4 md:grid-cols-3">
              {/* Insurance */}
              <div className={cn(
                'p-4 rounded-lg border',
                isExpired(vehicle.insurance_expiry) ? 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800' :
                isExpiringSoon(vehicle.insurance_expiry) ? 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800' :
                'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800'
              )}>
                <div className="flex items-center gap-3">
                  <Shield className={cn(
                    'w-8 h-8',
                    isExpired(vehicle.insurance_expiry) ? 'text-red-600 dark:text-red-400' :
                    isExpiringSoon(vehicle.insurance_expiry) ? 'text-yellow-600 dark:text-yellow-400' :
                    'text-green-600 dark:text-green-400'
                  )} />
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">Seguro</p>
                    {vehicle.insurance_expiry ? (
                      <p className={cn(
                        'text-sm',
                        isExpired(vehicle.insurance_expiry) ? 'text-red-600 dark:text-red-400' :
                        isExpiringSoon(vehicle.insurance_expiry) ? 'text-yellow-600 dark:text-yellow-400' :
                        'text-green-600 dark:text-green-400'
                      )}>
                        {isExpired(vehicle.insurance_expiry) ? 'Vencido' :
                         isExpiringSoon(vehicle.insurance_expiry) ? 'Por vencer' : 'Vigente'} - {new Date(vehicle.insurance_expiry).toLocaleDateString('es-ES')}
                      </p>
                    ) : (
                      <p className="text-sm text-gray-500 dark:text-gray-400">No registrado</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Registration */}
              <div className={cn(
                'p-4 rounded-lg border',
                isExpired(vehicle.registration_expiry) ? 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800' :
                isExpiringSoon(vehicle.registration_expiry) ? 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800' :
                'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800'
              )}>
                <div className="flex items-center gap-3">
                  <FileText className={cn(
                    'w-8 h-8',
                    isExpired(vehicle.registration_expiry) ? 'text-red-600 dark:text-red-400' :
                    isExpiringSoon(vehicle.registration_expiry) ? 'text-yellow-600 dark:text-yellow-400' :
                    'text-green-600 dark:text-green-400'
                  )} />
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">Registro</p>
                    {vehicle.registration_expiry ? (
                      <p className={cn(
                        'text-sm',
                        isExpired(vehicle.registration_expiry) ? 'text-red-600 dark:text-red-400' :
                        isExpiringSoon(vehicle.registration_expiry) ? 'text-yellow-600 dark:text-yellow-400' :
                        'text-green-600 dark:text-green-400'
                      )}>
                        {isExpired(vehicle.registration_expiry) ? 'Vencido' :
                         isExpiringSoon(vehicle.registration_expiry) ? 'Por vencer' : 'Vigente'} - {new Date(vehicle.registration_expiry).toLocaleDateString('es-ES')}
                      </p>
                    ) : (
                      <p className="text-sm text-gray-500 dark:text-gray-400">No registrado</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Last Inspection */}
              <div className="p-4 rounded-lg border bg-gray-50 dark:bg-gray-700/50 border-gray-200 dark:border-gray-600">
                <div className="flex items-center gap-3">
                  <Wrench className="w-8 h-8 text-gray-600 dark:text-gray-400" />
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">Ultima Inspeccion</p>
                    {vehicle.last_inspection ? (
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {new Date(vehicle.last_inspection).toLocaleDateString('es-ES')}
                      </p>
                    ) : (
                      <p className="text-sm text-gray-500 dark:text-gray-400">No registrada</p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Alert if something is expired or expiring */}
            {(isExpired(vehicle.insurance_expiry) || isExpired(vehicle.registration_expiry)) && (
              <div className="mt-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-red-800 dark:text-red-300">Documentos Vencidos</p>
                  <p className="text-sm text-red-600 dark:text-red-400">
                    Tienes documentos vencidos. Por favor actualiza tu seguro o registro para poder continuar trabajando.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Upload Documents Section */}
      {vehicle && !editing && (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="p-6 border-b border-gray-100 dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
              <Camera className="w-5 h-5" />
              Fotos del Vehiculo
            </h2>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {['Frente', 'Atras', 'Lateral Izq.', 'Lateral Der.'].map((label, index) => (
                <div
                  key={index}
                  className="aspect-video bg-gray-100 dark:bg-gray-700 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600 flex flex-col items-center justify-center cursor-pointer hover:border-am-navy dark:hover:border-am-orange transition-colors"
                >
                  <Camera className="w-8 h-8 text-gray-400 mb-2" />
                  <p className="text-sm text-gray-500 dark:text-gray-400">{label}</p>
                </div>
              ))}
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-4 text-center">
              Haz clic para subir fotos de tu vehiculo
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
