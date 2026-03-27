import { Head, Link } from '@inertiajs/react';
import { about, contacts } from '@/routes';
import {
    CheckCircleIcon,
    HandshakeIcon,
    LucideIcon,
    Rotate3DIcon,
    UserCircleIcon,
} from 'lucide-react';

export default function AboutUs() {
    const values = [
        {
            title: 'Качество',
            description:
                'Всеки продукт преминава през стриктен контрол за качество.',
            icon: 'verified_user',
        },
        {
            title: 'Прецизност',
            description:
                'Модерни технологии за максимална точност в производството.',
            icon: 'track_changes',
        },
        {
            title: 'Партньорство',
            description:
                'Изграждаме дългосрочни взаимоотношения с нашите клиенти.',
            icon: 'handshake',
        },
        {
            title: 'Гъвкавост',
            description:
                'Адаптираме се към специфичните нужди на всеки клиент.',
            icon: 'transform',
        },
    ];

    const iconMap: Record<string, LucideIcon> = {
        verified_user: UserCircleIcon,
        track_changes: CheckCircleIcon,
        handshake: HandshakeIcon,
        transform: Rotate3DIcon,
    };

    const teamMembers = [
        {
            name: 'Милен Косев',
            role: 'Управител',
            bio: 'Основател на компанията с над 25 години опит в металообработката.',
        },
        {
            name: 'Мария Петрова',
            role: 'Търговски директор',
            bio: 'Отговаря за връзките с европейските партньори и развитието на бизнеса.',
        },
        {
            name: 'Георги Димитров',
            role: 'Технически директор',
            bio: 'Ръководи производствените процеси и внедряването на нови технологии.',
        },
        {
            name: 'Елена Николова',
            role: 'Мениджър качество',
            bio: 'Осигурява спазването на стандартите и сертификацията на продуктите.',
        },
    ];

    const facilityFeatures = [
        '5000+ кв.м. производствена площ',
        'Fiber лазер TRUMPF 6kW',
        'CNC абкант преси TRUMPF',
        'Роботизирани заваръчни клетки',
        'CAD/CAM система за проектиране',
        '3D измервателно оборудване',
        'Собствен автопарк за доставки',
        'ERP система за управление',
    ];

    const stats = [
        { value: '20+', label: 'Години опит' },
        { value: '80+', label: 'Служители' },
        { value: '50+', label: 'Европейски партньори' },
        { value: '500+', label: 'Проекта годишно' },
    ];
    return (
        <>
            <Head title="За нас" />
            <style>
                {`
                    .mat-icon {
  font-size: 2rem;
  color: var(--color-primary);
  width: 2rem;
  height: 2rem;
}

.page-hero {
  position: relative;
  padding: 10rem 0 5rem;
  min-height: 400px;
  display: flex;
  align-items: center;

  @media (min-width: 768px) {
    padding: 12rem 0 6rem;
  }
}

.hero-bg {
  position: absolute;
  inset: 0;
  z-index: 0;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    135deg,
    rgba(26, 26, 46, 0.95) 0%,
    rgba(26, 26, 46, 0.8) 100%
  );
}

.hero-content {
  position: relative;
  z-index: 1;
  max-width: 700px;
}

.hero-badge {
  display: inline-block;
  font-size: 0.875rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--color-accent);
  margin-bottom: 1rem;
}

h1 {
  color: var(--color-white);
  margin-bottom: 1rem;
  text-wrap: balance;
}

.hero-content p {
  font-size: 1.25rem;
  color: var(--color-gray-300);
  line-height: 1.7;
}

.story-grid {
  display: grid;
  gap: 3rem;
  align-items: center;

  @media (min-width: 1024px) {
    grid-template-columns: 1fr 1fr;
    gap: 4rem;
  }
}

.story-content {
  h2 {
    margin-bottom: 1.5rem;
  }

  p {
    font-size: 1.125rem;
    color: var(--color-gray-600);
    line-height: 1.8;
    margin-bottom: 1rem;

    &:last-of-type {
      margin-bottom: 0;
    }
  }
}

.story-image {
  img {
    width: 100%;
    border-radius: var(--radius-xl);
    aspect-ratio: 4 / 3;
    object-fit: cover;
  }
}

.values {
  background: var(--color-gray-50);
}

.values-grid {
  display: grid;
  gap: 1.5rem;

  @media (min-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(4, 1fr);
  }
}

.value-card {
  background: var(--color-white);
  padding: 2rem;
  border-radius: var(--radius-lg);
  border: 1px solid var(--color-gray-200);
  text-align: center;
  transition: all 0.3s ease;

  &:hover {
    box-shadow: var(--shadow-xl);
    transform: translateY(-4px);
  }
}

.value-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 56px;
  height: 56px;
  border-radius: var(--radius-lg);
  background: var(--color-primary);
  color: var(--color-white);
  margin: 0 auto 1rem;

  :host ::ng-deep svg {
    width: 28px;
    height: 28px;
  }
}

.value-card h3 {
  font-size: 1.125rem;
  margin-bottom: 0.5rem;
}

.value-card p {
  font-size: 0.9375rem;
  color: var(--color-gray-500);
  line-height: 1.6;
}

.team-grid {
  display: grid;
  gap: 1.5rem;

  @media (min-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(4, 1fr);
  }
}

.team-card {
  text-align: center;
  padding: 2rem;
  background: var(--color-white);
  border-radius: var(--radius-lg);
  border: 1px solid var(--color-gray-200);
}

.team-avatar {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: var(--color-accent);
  color: var(--color-accent-foreground);
  font-size: 2rem;
  font-weight: 600;
  margin: 0 auto 1rem;
}

.team-card h4 {
  font-size: 1.125rem;
  margin-bottom: 0.25rem;
}

.team-role {
  font-size: 0.875rem;
  color: var(--color-primary);
  font-weight: 500;
}

.team-card p {
  font-size: 0.875rem;
  color: var(--color-gray-500);
  line-height: 1.6;
  margin-top: 0.75rem;
}

.facility {
  background: var(--color-gray-50);
}

.facility-grid {
  display: grid;
  gap: 3rem;
  align-items: center;

  @media (min-width: 1024px) {
    grid-template-columns: 1fr 1fr;
    gap: 4rem;
  }
}

.facility-content {
  h2 {
    margin-bottom: 1.5rem;
  }

  p {
    font-size: 1.125rem;
    color: var(--color-gray-600);
    line-height: 1.8;
    margin-bottom: 1.5rem;
  }
}

.facility-features {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: 0.75rem;

  li {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    font-size: 1rem;
    color: var(--color-gray-700);

    svg {
      flex-shrink: 0;
      color: var(--color-primary);
    }
  }
}

.facility-images {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;

  img {
    width: 100%;
    border-radius: var(--radius-lg);
    aspect-ratio: 1;
    object-fit: cover;
  }
}

.stats-section {
  background: var(--color-steel);
  padding: 4rem 0;
}

.stats-grid {
  display: grid;
  gap: 2rem;
  text-align: center;

  @media (min-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(4, 1fr);
  }
}

.stat-item {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.stat-value {
  font-size: 3rem;
  font-weight: 700;
  color: var(--color-white);
}

.stat-label {
  font-size: 1rem;
  color: var(--color-gray-400);
}

.cta-banner {
  background: var(--color-gray-50);
  padding: 4rem 0;

  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;
    text-align: center;

    @media (min-width: 768px) {
      flex-direction: row;
      justify-content: space-between;
      text-align: left;
    }
  }

  h2 {
    font-size: 1.75rem;
    margin-bottom: 0.5rem;
  }

  p {
    color: var(--color-gray-600);
  }
}
`}
            </style>
            <section className="page-hero">
                <div className="hero-bg">
                    <img
                        src="/storage/images/kosev/kosev-back.jpg"
                        alt="Производствена база KOSEV"
                    />
                    <div className="hero-overlay"></div>
                </div>
                <div className="hero-content container">
                    <span className="hero-badge">За нас</span>
                    <h1>Над 20 години традиция в металообработката</h1>
                    <p>
                        KOSEV LTD е водещ производител на метални изделия в
                        България, обслужващ европейски партньори от 2003 година.
                    </p>
                </div>
            </section>

            <section className="section story">
                <div className="container">
                    <div className="story-grid">
                        <div className="story-content">
                            <span className="section-subtitle">
                                Нашата история
                            </span>
                            <h2>От семеен бизнес до европейски партньор</h2>
                            <p>
                                KOSEV LTD е основана през 2003 година като
                                семейна компания с визия за високо качество в
                                металообработката. През годините израснахме от
                                малък цех до модерно производствено предприятие
                                с над 5000 кв.м. производствена площ.
                            </p>
                            <p>
                                Днес сме доверен партньор на над 50 компании от
                                цяла Европа, включително Германия, Франция,
                                Италия, Австрия и Холандия. Нашият успех се
                                дължи на непрекъснатите инвестиции в модерно
                                оборудване, квалифициран персонал и стриктен
                                контрол на качеството.
                            </p>
                        </div>
                        <div className="story-image">
                            <img
                                src="/storage/images/kosev/kosev-front.jpg"
                                alt="Производствена база"
                                loading="lazy"
                            />
                        </div>
                    </div>
                </div>
            </section>

            <section className="section values">
                <div className="container">
                    <div className="section-header">
                        <span className="section-subtitle">
                            Нашите ценности
                        </span>
                        <h2 className="section-title">
                            Принципите, които ни водят
                        </h2>
                    </div>

                    <div className="values-grid">
                        {values.map((value, idx) => (
                            <div className="value-card" key={idx}>
                                {(() => {
                                    const Icon = iconMap[value.icon];
                                    return Icon ? (
                                        <Icon className="h-10 w-10 min-w-10" />
                                    ) : null;
                                })()}
                                <h3>{value.title}</h3>
                                <p>{value.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="section team">
                <div className="container">
                    <div className="section-header">
                        <span className="section-subtitle">Нашият екип</span>
                        <h2 className="section-title">Хората зад успеха</h2>
                        <p className="section-description">
                            Над 80 квалифицирани специалисти работят ежедневно,
                            за да осигурят най-високо качество.
                        </p>
                    </div>

                    <div className="team-grid">
                        {teamMembers.map((member, idx) => (
                            <div className="team-card" key={idx}>
                                <div className="team-avatar">
                                    {member.name.charAt(0)}
                                </div>
                                <h4>{member.name}</h4>
                                <span className="team-role">{member.role}</span>
                                <p>{member.bio}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="section facility">
                <div className="container">
                    <div className="facility-grid">
                        <div className="facility-content">
                            <span className="section-subtitle">
                                Производствена база
                            </span>
                            <h2>Модерно оборудване и съоръжения</h2>
                            <p>
                                Нашата производствена база разполага с над 5000
                                кв.м. покрита площ, оборудвана с най-съвременни
                                машини от водещи световни производители.
                            </p>

                            <ul className="facility-features">
                                {facilityFeatures.map((feature, idx) => (
                                    <li key={idx}>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="20"
                                            height="20"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        >
                                            <path d="M20 6 9 17l-5-5" />
                                        </svg>
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="facility-images">
                            <img
                                src="/storage/images/kosev/modern-tech.jpg"
                                alt="CNC машини"
                                loading="lazy"
                            />
                            <img
                                src="/storage/images/kosev/modern-tech-2.jpg"
                                alt="Лазерно оборудване"
                                loading="lazy"
                            />
                        </div>
                    </div>
                </div>
            </section>

            <section className="section stats-section">
                <div className="container">
                    <div className="stats-grid">
                        {stats.map((stat, idx) => (
                            <div className="stat-item" key={idx}>
                                <span className="stat-value">{stat.value}</span>
                                <span className="stat-label">{stat.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="cta-banner">
                <div className="container">
                    <div className="cta-content">
                        <h2>Станете наш партньор</h2>
                        <p>
                            Свържете се с нас и открийте как можем да
                            подпомогнем вашето производство.
                        </p>
                    </div>
                    <Link href={contacts()} className="btn btn-accent btn-lg">
                        Свържете се с нас
                    </Link>
                </div>
            </section>
        </>
    );
}

AboutUs.layout = {
    breadcrumbs: [
        {
            title: 'About Us',
            href: about(),
        },
    ],
};
