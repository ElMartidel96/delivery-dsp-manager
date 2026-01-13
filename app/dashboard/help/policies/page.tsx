'use client';

import Link from 'next/link';
import {
  ArrowLeft,
  Shield,
  FileText,
  Scale,
  Lock,
  Eye,
  UserCheck,
  AlertCircle,
  CheckCircle,
  Clock,
  DollarSign,
  Truck,
  Heart,
  Star,
  Ban,
  RefreshCw,
} from 'lucide-react';

const sections = [
  {
    id: 'compromiso',
    icon: Heart,
    title: 'Nuestro Compromiso Contigo',
    content: `En AUTOS MALL LLC, creemos que el éxito se construye sobre la confianza mutua.

Nos comprometemos a:
• Pagarte puntualmente cada semana, sin excusas
• Proporcionarte las herramientas necesarias para tu éxito
• Tratarte con respeto y dignidad en todo momento
• Escuchar tus sugerencias y mejorar continuamente
• Apoyarte en tu camino hacia la independencia financiera

Tu éxito es nuestro éxito. Cuando ganas, todos ganamos.`,
  },
  {
    id: 'pagos',
    icon: DollarSign,
    title: 'Política de Pagos',
    content: `Transparencia total en tu compensación:

ESTRUCTURA DE PAGO:
• Pago base por entrega: Varía según distancia y zona
• Bonos de puntualidad: +$2-5 por entrega a tiempo
• Bonos de volumen: Incentivos por alcanzar metas semanales
• Propinas: 100% tuyas, sin comisiones

CICLO DE PAGO:
• Semana de trabajo: Lunes a Domingo
• Procesamiento: Cada Lunes
• Depósito: 1-2 días hábiles después del procesamiento
• Método: Depósito directo a tu cuenta bancaria

DEDUCCIONES:
• NO cobramos tarifas de plataforma
• NO hay costos ocultos
• Solo deducciones legales requeridas`,
  },
  {
    id: 'conducta',
    icon: UserCheck,
    title: 'Código de Conducta',
    content: `Estándares que nos hacen excelentes:

PROFESIONALISMO:
• Vestimenta apropiada y presentación personal
• Comunicación respetuosa con clientes
• Puntualidad en las entregas
• Cuidado de los paquetes como si fueran tuyos

INTEGRIDAD:
• Honestidad en todas las interacciones
• Reporte preciso de entregas y problemas
• Respeto a la propiedad del cliente
• Confidencialidad de la información

LO QUE ESPERAMOS:
✓ Rating mínimo de 4.5 estrellas
✓ Tasa de entrega exitosa del 95%+
✓ Comunicación proactiva con clientes
✓ Seguimiento de rutas asignadas`,
  },
  {
    id: 'seguridad',
    icon: Shield,
    title: 'Política de Seguridad',
    content: `Tu seguridad es nuestra máxima prioridad:

EN LA CARRETERA:
• Respeta siempre las leyes de tránsito
• No uses el teléfono mientras conduces
• Toma descansos cuando lo necesites
• Reporta cualquier incidente inmediatamente

ENTREGAS SEGURAS:
• Verifica la dirección antes de entregar
• Nunca entres a una propiedad sin permiso
• Si algo no se siente bien, contacta a soporte
• Documenta todas las entregas con fotos

EMERGENCIAS:
• Línea directa 24/7: (954) 795-4030
• En caso de accidente, tu seguridad primero
• Cobertura de seguro durante horas de trabajo
• Asistencia en carretera disponible`,
  },
  {
    id: 'vehiculo',
    icon: Truck,
    title: 'Requisitos del Vehículo',
    content: `Tu vehículo es tu herramienta de trabajo:

REQUISITOS MÍNIMOS:
• Año 2015 o más reciente
• 4 puertas (preferido) o SUV/Van
• Seguro vigente con cobertura comercial
• Registro actualizado
• Inspección mecánica aprobada

MANTENIMIENTO:
• Vehículo limpio interior y exterior
• Llantas en buen estado
• Luces funcionando correctamente
• Sin daños visibles significativos

RECOMENDACIONES:
• Revisión mecánica cada 3 meses
• Mantén tu tanque al menos 1/4 lleno
• Kit de emergencia en el vehículo
• Cargador de teléfono funcional`,
  },
  {
    id: 'privacidad',
    icon: Lock,
    title: 'Privacidad y Datos',
    content: `Protegemos tu información:

DATOS QUE RECOPILAMOS:
• Información de contacto y bancaria para pagos
• Ubicación durante horas de trabajo (para asignaciones)
• Historial de entregas y rendimiento
• Comunicaciones con soporte

CÓMO USAMOS TUS DATOS:
• Procesar tus pagos
• Asignar rutas eficientemente
• Mejorar nuestros servicios
• Comunicarnos contigo

TUS DERECHOS:
• Acceder a tus datos personales
• Solicitar correcciones
• Eliminar tu cuenta cuando quieras
• Tus datos nunca se venden a terceros`,
  },
  {
    id: 'terminacion',
    icon: RefreshCw,
    title: 'Suspensión y Terminación',
    content: `Proceso justo y transparente:

CAUSAS DE SUSPENSIÓN TEMPORAL:
• Rating por debajo de 4.0 (con plan de mejora)
• Documentos vencidos
• Quejas repetidas de clientes

CAUSAS DE TERMINACIÓN INMEDIATA:
• Robo o fraude comprobado
• Conducción bajo influencia de sustancias
• Violencia o amenazas
• Falsificación de documentos

TU DERECHO A APELAR:
• 5 días para presentar apelación
• Revisión por comité imparcial
• Respuesta en 48 horas hábiles
• Posibilidad de reintegración`,
  },
  {
    id: 'prohibiciones',
    icon: Ban,
    title: 'Conductas Prohibidas',
    content: `Tolerancia cero con:

ABSOLUTAMENTE PROHIBIDO:
✗ Conducir bajo efectos de alcohol o drogas
✗ Compartir tu cuenta con terceros
✗ Manipular fotos de entrega
✗ Abrir o dañar paquetes
✗ Discriminación de cualquier tipo
✗ Acoso a clientes o compañeros
✗ Uso del vehículo para fines personales durante turno
✗ Compartir información de clientes

CONSECUENCIAS:
Violaciones resultan en suspensión inmediata y posible terminación permanente, además de acciones legales si aplica.`,
  },
];

export default function PoliciesPage() {
  return (
    <div className="space-y-6 max-w-4xl pb-12">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link
          href="/dashboard/help"
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-gray-600 dark:text-gray-400" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Políticas y Términos
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            Reglas claras para una colaboración exitosa
          </p>
        </div>
      </div>

      {/* Intro Banner */}
      <div className="bg-gradient-to-r from-am-navy to-am-navy-light rounded-xl p-6 text-white">
        <div className="flex items-start gap-4">
          <Scale className="w-10 h-10 text-am-orange flex-shrink-0" />
          <div>
            <h2 className="text-xl font-bold mb-2">Transparencia Total</h2>
            <p className="text-gray-300">
              Creemos que las mejores relaciones se basan en reglas claras y expectativas definidas.
              Estos términos existen para protegerte a ti, a nuestros clientes, y a la comunidad.
              Sin letra pequeña, sin sorpresas.
            </p>
          </div>
        </div>
      </div>

      {/* Last Updated */}
      <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
        <Clock className="w-4 h-4" />
        <span>Última actualización: Enero 2026</span>
      </div>

      {/* Quick Navigation */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-4">
        <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Navegación Rápida</h3>
        <div className="flex flex-wrap gap-2">
          {sections.map((section) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              className="px-3 py-1.5 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-am-orange/20 hover:text-am-orange transition-colors"
            >
              {section.title}
            </a>
          ))}
        </div>
      </div>

      {/* Sections */}
      <div className="space-y-6">
        {sections.map((section) => (
          <div
            key={section.id}
            id={section.id}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 scroll-mt-20"
          >
            <div className="p-6 border-b border-gray-100 dark:border-gray-700 flex items-center gap-3">
              <div className="p-2 bg-am-navy/10 dark:bg-am-navy/30 rounded-lg">
                <section.icon className="w-6 h-6 text-am-navy dark:text-am-orange" />
              </div>
              <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                {section.title}
              </h2>
            </div>
            <div className="p-6">
              <div className="prose prose-gray dark:prose-invert max-w-none">
                {section.content.split('\n').map((paragraph, i) => (
                  <p
                    key={i}
                    className="text-gray-600 dark:text-gray-400 whitespace-pre-line mb-2 last:mb-0"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Agreement Section */}
      <div className="bg-am-green/10 dark:bg-am-green/20 rounded-xl p-6 border border-am-green/30">
        <div className="flex items-start gap-4">
          <CheckCircle className="w-8 h-8 text-am-green flex-shrink-0" />
          <div>
            <h3 className="font-bold text-gray-900 dark:text-white mb-2">
              Tu Aceptación
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Al utilizar nuestra plataforma y realizar entregas, confirmas que has leído,
              entendido y aceptado estas políticas y términos. Nos reservamos el derecho
              de actualizar estos términos, notificándote con anticipación de cualquier
              cambio significativo.
            </p>
          </div>
        </div>
      </div>

      {/* Contact for Questions */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
        <div className="flex items-start gap-4">
          <AlertCircle className="w-8 h-8 text-am-orange flex-shrink-0" />
          <div>
            <h3 className="font-bold text-gray-900 dark:text-white mb-2">
              ¿Tienes Preguntas?
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
              Si algo no está claro o tienes dudas sobre estas políticas, estamos aquí para ayudarte.
              La comunicación abierta es parte de nuestros valores.
            </p>
            <a
              href="mailto:contact@autosmall.com"
              className="inline-flex items-center gap-2 px-4 py-2 bg-am-navy dark:bg-am-orange text-white rounded-lg text-sm font-medium hover:bg-am-navy-light dark:hover:bg-am-orange-light transition-colors"
            >
              <FileText className="w-4 h-4" />
              Contactar Soporte
            </a>
          </div>
        </div>
      </div>

      {/* Trust Badge */}
      <div className="text-center py-6">
        <div className="inline-flex items-center gap-3 px-6 py-3 bg-gray-100 dark:bg-gray-700 rounded-full">
          <Shield className="w-5 h-5 text-am-green" />
          <span className="text-sm text-gray-600 dark:text-gray-400">
            Comprometidos con la transparencia y tu éxito
          </span>
          <Star className="w-5 h-5 text-am-orange" />
        </div>
      </div>
    </div>
  );
}
