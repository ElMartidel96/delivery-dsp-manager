'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import {
  FileText,
  Upload,
  Download,
  Eye,
  CheckCircle,
  Clock,
  AlertTriangle,
  XCircle,
  Loader2,
  Shield,
  Car,
  CreditCard,
  UserCheck,
  Calendar,
  RefreshCw,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface Document {
  id: string;
  driver_id: string;
  type: string;
  name: string;
  file_url: string | null;
  status: 'pending' | 'approved' | 'rejected' | 'expired';
  expiry_date: string | null;
  uploaded_at: string;
  reviewed_at: string | null;
  notes: string | null;
}

const documentTypes = [
  { id: 'drivers_license', name: 'Licencia de Conducir', icon: CreditCard, required: true },
  { id: 'insurance', name: 'Seguro del Vehiculo', icon: Shield, required: true },
  { id: 'vehicle_registration', name: 'Registro del Vehiculo', icon: Car, required: true },
  { id: 'background_check', name: 'Verificacion de Antecedentes', icon: UserCheck, required: true },
  { id: 'w9_form', name: 'Formulario W-9', icon: FileText, required: true },
  { id: 'profile_photo', name: 'Foto de Perfil', icon: UserCheck, required: false },
];

export default function MyDocumentsPage() {
  const [loading, setLoading] = useState(true);
  const [documents, setDocuments] = useState<Document[]>([]);
  const [uploading, setUploading] = useState<string | null>(null);

  useEffect(() => {
    const fetchDocuments = async () => {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();

      if (user) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const { data: docsData } = await (supabase as any)
          .from('driver_documents')
          .select('*')
          .eq('driver_id', user.id)
          .order('uploaded_at', { ascending: false }) as { data: Document[] | null };

        if (docsData) {
          setDocuments(docsData);
        }
      }
      setLoading(false);
    };

    fetchDocuments();
  }, []);

  const getDocumentStatus = (docType: string) => {
    const doc = documents.find(d => d.type === docType);
    if (!doc) return { status: 'missing', document: null };

    // Check if expired
    if (doc.expiry_date && new Date(doc.expiry_date) < new Date()) {
      return { status: 'expired', document: doc };
    }

    return { status: doc.status, document: doc };
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return { bg: 'bg-green-100 dark:bg-green-900/30', text: 'text-green-700 dark:text-green-400', label: 'Aprobado', icon: CheckCircle };
      case 'pending':
        return { bg: 'bg-yellow-100 dark:bg-yellow-900/30', text: 'text-yellow-700 dark:text-yellow-400', label: 'En Revision', icon: Clock };
      case 'rejected':
        return { bg: 'bg-red-100 dark:bg-red-900/30', text: 'text-red-700 dark:text-red-400', label: 'Rechazado', icon: XCircle };
      case 'expired':
        return { bg: 'bg-orange-100 dark:bg-orange-900/30', text: 'text-orange-700 dark:text-orange-400', label: 'Vencido', icon: AlertTriangle };
      default:
        return { bg: 'bg-gray-100 dark:bg-gray-700', text: 'text-gray-700 dark:text-gray-400', label: 'No Subido', icon: Upload };
    }
  };

  const handleUpload = async (docType: string) => {
    setUploading(docType);
    // Simulate upload - in production this would open a file picker and upload to storage
    await new Promise(resolve => setTimeout(resolve, 2000));
    setUploading(null);
    // Show success message or update state
  };

  const completionPercentage = () => {
    const requiredDocs = documentTypes.filter(d => d.required);
    const approvedDocs = requiredDocs.filter(d => {
      const { status } = getDocumentStatus(d.id);
      return status === 'approved';
    });
    return Math.round((approvedDocs.length / requiredDocs.length) * 100);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-am-navy dark:text-am-orange" />
      </div>
    );
  }

  const completion = completionPercentage();

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Mis Documentos</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Sube y administra tus documentos requeridos
        </p>
      </div>

      {/* Progress Card */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="font-semibold text-gray-900 dark:text-white">Progreso de Documentacion</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {completion === 100 ? 'Todos los documentos estan completos' : 'Completa tu documentacion para comenzar'}
            </p>
          </div>
          <div className="text-right">
            <p className="text-3xl font-bold text-am-navy dark:text-am-orange">{completion}%</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">Completado</p>
          </div>
        </div>
        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <div
            className={cn(
              'h-full rounded-full transition-all duration-500',
              completion === 100 ? 'bg-am-green' : 'bg-gradient-to-r from-am-navy to-am-orange'
            )}
            style={{ width: `${completion}%` }}
          />
        </div>
        {completion < 100 && (
          <p className="text-sm text-yellow-600 dark:text-yellow-400 mt-3 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4" />
            Debes completar todos los documentos requeridos para poder recibir entregas
          </p>
        )}
      </div>

      {/* Documents Grid */}
      <div className="grid gap-4">
        {documentTypes.map((docType) => {
          const { status, document } = getDocumentStatus(docType.id);
          const statusInfo = getStatusBadge(status);
          const StatusIcon = statusInfo.icon;
          const DocIcon = docType.icon;

          return (
            <div
              key={docType.id}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className={cn(
                      'p-3 rounded-xl',
                      status === 'approved' ? 'bg-green-100 dark:bg-green-900/30' :
                      status === 'pending' ? 'bg-yellow-100 dark:bg-yellow-900/30' :
                      status === 'rejected' || status === 'expired' ? 'bg-red-100 dark:bg-red-900/30' :
                      'bg-gray-100 dark:bg-gray-700'
                    )}>
                      <DocIcon className={cn(
                        'w-6 h-6',
                        status === 'approved' ? 'text-green-600 dark:text-green-400' :
                        status === 'pending' ? 'text-yellow-600 dark:text-yellow-400' :
                        status === 'rejected' || status === 'expired' ? 'text-red-600 dark:text-red-400' :
                        'text-gray-600 dark:text-gray-400'
                      )} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-gray-900 dark:text-white">{docType.name}</h3>
                        {docType.required && (
                          <span className="text-xs bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 px-2 py-0.5 rounded-full">
                            Requerido
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <span className={cn('text-xs px-2 py-0.5 rounded-full flex items-center gap-1', statusInfo.bg, statusInfo.text)}>
                          <StatusIcon className="w-3 h-3" />
                          {statusInfo.label}
                        </span>
                        {document?.expiry_date && (
                          <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            Vence: {new Date(document.expiry_date).toLocaleDateString('es-ES')}
                          </span>
                        )}
                      </div>
                      {document?.notes && status === 'rejected' && (
                        <p className="text-sm text-red-600 dark:text-red-400 mt-2">
                          Razon: {document.notes}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {document && status !== 'missing' && (
                      <>
                        <button
                          className="p-2 text-gray-600 dark:text-gray-400 hover:text-am-navy dark:hover:text-am-orange hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                          title="Ver documento"
                        >
                          <Eye className="w-5 h-5" />
                        </button>
                        <button
                          className="p-2 text-gray-600 dark:text-gray-400 hover:text-am-navy dark:hover:text-am-orange hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                          title="Descargar"
                        >
                          <Download className="w-5 h-5" />
                        </button>
                      </>
                    )}
                    <button
                      onClick={() => handleUpload(docType.id)}
                      disabled={uploading === docType.id}
                      className={cn(
                        'flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-colors',
                        status === 'missing' || status === 'rejected' || status === 'expired'
                          ? 'bg-am-navy dark:bg-am-orange text-white hover:bg-am-navy-light dark:hover:bg-am-orange-light'
                          : 'border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700',
                        uploading === docType.id && 'opacity-50 cursor-not-allowed'
                      )}
                    >
                      {uploading === docType.id ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Subiendo...
                        </>
                      ) : status === 'missing' ? (
                        <>
                          <Upload className="w-4 h-4" />
                          Subir
                        </>
                      ) : (
                        <>
                          <RefreshCw className="w-4 h-4" />
                          Actualizar
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Info Card */}
      <div className="bg-gradient-to-r from-am-navy to-am-navy-light rounded-xl p-6 text-white">
        <div className="flex items-start gap-4">
          <FileText className="w-8 h-8 text-am-orange flex-shrink-0" />
          <div>
            <h3 className="font-semibold text-lg mb-1">Informacion Importante</h3>
            <ul className="text-sm text-gray-300 space-y-2">
              <li>• Los documentos deben estar vigentes y ser legibles</li>
              <li>• Formatos aceptados: PDF, JPG, PNG (max 10MB)</li>
              <li>• La revision de documentos puede tomar hasta 24 horas</li>
              <li>• Recibirás una notificación cuando tus documentos sean aprobados</li>
              <li>• Si un documento es rechazado, puedes volver a subirlo con las correcciones</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Document History */}
      {documents.length > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="p-6 border-b border-gray-100 dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Historial de Documentos
            </h2>
          </div>
          <div className="divide-y divide-gray-100 dark:divide-gray-700">
            {documents.slice(0, 5).map((doc) => {
              const statusInfo = getStatusBadge(doc.status);
              return (
                <div key={doc.id} className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">{doc.name}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Subido: {new Date(doc.uploaded_at).toLocaleDateString('es-ES')}
                      </p>
                    </div>
                  </div>
                  <span className={cn('text-xs px-2 py-1 rounded-full', statusInfo.bg, statusInfo.text)}>
                    {statusInfo.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
