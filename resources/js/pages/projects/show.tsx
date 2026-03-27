import { projectsData } from '@/data/projects';
import { cn } from '@/lib/utils';
import { contacts } from '@/routes';
import { index as projectsIndex } from '@/routes/projects';
import { Head, Link } from '@inertiajs/react';
import { ChevronLeft } from 'lucide-react';
import { useState } from 'react';

export default function ProjectDetail({ project }: { project: number }) {
    const [selected] = useState(
        projectsData.find((p) => p.id === Number(project)),
    );
    const [activeImageIndex, setActiveImageIndex] = useState(0);
    const activeImage = selected ? selected.images[activeImageIndex] : '';

    return (
        <>
            <Head title="Проект - Шаси компоненти" />

            {/* Main content would go here - images, description, specs, etc. */}
            <style>{`
      .page-hero {
  position: relative;
  padding: 10rem 0 5rem;
  min-height: 400px;
  display: flex;
  align-items: flex-end;

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
  background: linear-gradient(135deg, rgba(26, 26, 46, 0.95) 0%, rgba(26, 26, 46, 0.7) 100%);
}

.hero-content {
  position: relative;
  z-index: 1;
  max-width: 700px;
}

.back-link {
  display: inline-block;
  font-size: 0.875rem;
  color: var(--color-gray-400);
  text-decoration: none;
  margin-bottom: 1rem;
  transition: color 0.2s ease;

  &:hover {
    color: var(--color-accent);
  }
}

.hero-badge {
  display: inline-block;
  font-size: 0.875rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--color-accent);
  margin-bottom: 0.75rem;
}

.hero-content h1 {
  color: var(--color-white);
  text-wrap: balance;
}

.project-detail {
  background: var(--color-background);
}

.detail-grid {
  display: grid;
  gap: 4rem;
  align-items: start;

  @media (min-width: 1024px) {
    grid-template-columns: 1fr 1fr;
    gap: 5rem;
  }
}

.gallery-main {
  border-radius: var(--radius-xl);
  overflow: hidden;
  aspect-ratio: 4 / 3;
  margin-bottom: 1rem;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.gallery-thumbs {
  display: flex;
  gap: 0.75rem;
}

.thumb {
  width: 80px;
  height: 60px;
  border-radius: var(--radius-md);
  overflow: hidden;
  border: 2px solid var(--color-gray-200);
  cursor: pointer;
  padding: 0;
  background: none;
  transition: border-color 0.2s ease;
  flex-shrink: 0;

  &:hover {
    border-color: var(--color-gray-400);
  }

  &.active {
    border-color: var(--color-accent);
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.project-info {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.project-desc {
  font-size: 1.0625rem;
  color: var(--color-gray-600);
  line-height: 1.8;
}

.meta-row {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.meta-label {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--color-gray-500);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.industry-badge {
  display: inline-block;
  padding: 0.375rem 0.875rem;
  background: var(--color-gray-100);
  border-radius: 100px;
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--color-gray-700);
}

.specs-block {
  h3 {
    font-size: 1rem;
    font-weight: 700;
    color: var(--color-gray-900);
    margin-bottom: 1rem;
    padding-bottom: 0.75rem;
    border-bottom: 1px solid var(--color-gray-200);
  }
}

.specs-table {
  width: 100%;
  border-collapse: collapse;

  tr {
    border-bottom: 1px solid var(--color-gray-100);

    &:last-child {
      border-bottom: none;
    }
  }

  td {
    padding: 0.75rem 0;
    font-size: 0.9375rem;
    vertical-align: top;
  }

  .spec-label {
    color: var(--color-gray-500);
    width: 50%;
    padding-right: 1rem;
  }

  .spec-value {
    color: var(--color-gray-900);
    font-weight: 500;
  }
}

.tags-block {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.tag {
  padding: 0.25rem 0.625rem;
  background: var(--color-gray-100);
  border-radius: var(--radius-sm);
  font-size: 0.75rem;
  font-weight: 500;
  color: var(--color-gray-600);
}

.cta-btn {
  align-self: flex-start;
}

.not-found {
  padding: 10rem 0 6rem;
  text-align: center;

  h1 {
    margin-bottom: 2rem;
  }
}

      }`}</style>
            {!selected ? (
                <section className="not-found">
                    <div className="container">
                        <h1>Проектът не е намерен</h1>
                        <Link
                            href={projectsIndex()}
                            className="btn btn-primary"
                        >
                            <ChevronLeft size={18} />
                            Обратно към проектите
                        </Link>
                    </div>
                </section>
            ) : (
                <>
                    <section className="page-hero">
                        <div className="hero-bg">
                            <img
                                src={selected.images[0]}
                                alt={selected.title}
                            />
                            <div className="hero-overlay"></div>
                        </div>
                        <div className="hero-content container">
                            <Link href={projectsIndex()} className="back-link">
                                ← Всички проекти
                            </Link>
                            <span className="hero-badge">
                                {selected.industry}
                            </span>
                            <h1>{selected.title}</h1>
                        </div>
                    </section>
                    <section className="section project-detail">
                        <div className="container">
                            <div className="detail-grid">
                                <div className="gallery">
                                    <div className="gallery-main">
                                        <img
                                            src={activeImage}
                                            alt={selected.title}
                                        />
                                    </div>
                                    <div className="gallery-thumbs">
                                        {selected.images.map((img, index) => (
                                            <button
                                                className={cn(
                                                    'thumb',
                                                    activeImageIndex ===
                                                        index && 'active',
                                                )}
                                                key={index}
                                                onClick={() =>
                                                    setActiveImageIndex(index)
                                                }
                                            >
                                                <img
                                                    src={img}
                                                    alt={
                                                        selected.title +
                                                        ' ' +
                                                        (index + 1)
                                                    }
                                                    loading="lazy"
                                                />
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="project-info">
                                    <p className="project-desc">
                                        {selected.description}
                                    </p>

                                    <div className="meta-row">
                                        <span className="meta-label">
                                            Индустрия
                                        </span>
                                        <span className="meta-value industry-badge">
                                            {selected.industry}
                                        </span>
                                    </div>

                                    <div className="specs-block">
                                        <h3>Технически детайли</h3>
                                        <table className="specs-table">
                                            <tbody>
                                                {selected.specs.map((spec) => (
                                                    <tr key={spec.label}>
                                                        <td className="spec-label">
                                                            {spec.label}
                                                        </td>
                                                        <td className="spec-value">
                                                            {spec.value}
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>

                                    <div className="tags-block">
                                        {selected.tags.map((tag) => (
                                            <span className="tag" key={tag}>
                                                {tag}
                                            </span>
                                        ))}
                                    </div>

                                    <Link
                                        href={contacts()}
                                        className="btn btn-accent btn-lg cta-btn"
                                    >
                                        Изпрати запитване за подобен проект
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </section>
                </>
            )}
        </>
    );
}
