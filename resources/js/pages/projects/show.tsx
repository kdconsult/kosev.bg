import { Link, usePage } from '@inertiajs/react';
import { ChevronLeft } from 'lucide-react';
import { useState } from 'react';
import { JsonLd } from '@/components/json-ld';
import { SeoHead } from '@/components/seo-head';
import { cn } from '@/lib/utils';
import { contacts } from '@/routes';
import { index as projectsIndex } from '@/routes/projects';
import type { Project } from '@/types';

export default function ProjectDetail({ project }: { project: Project }) {
    const { appUrl } = usePage().props as { appUrl: string };
    const [activeImageIndex, setActiveImageIndex] = useState(-1);
    const activeImage =
        activeImageIndex === -1
            ? project.cover_image?.originalUrl
            : project.images[activeImageIndex]?.originalUrl;
    const description =
        project.description.length > 160
            ? `${project.description.slice(0, 157)}...`
            : project.description;

    const creativeWorkData = {
        '@context': 'https://schema.org',
        '@type': 'CreativeWork',
        name: project.title,
        description,
        image: project.cover_image?.originalUrl,
        about: project.category.name,
        keywords: project.tags.map((tag) => tag.name).join(', '),
    };

    const breadcrumbData = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Начало', item: appUrl },
            {
                '@type': 'ListItem',
                position: 2,
                name: 'Проекти',
                item: `${appUrl}/projects`,
            },
            {
                '@type': 'ListItem',
                position: 3,
                name: project.title,
                item: `${appUrl}/projects/${project.slug}`,
            },
        ],
    };

    return (
        <>
            <SeoHead
                title={project.title}
                description={description}
                ogImage={project.cover_image?.originalUrl}
                type="article"
            >
                <JsonLd headKey="project-jsonld" data={creativeWorkData} />
                <JsonLd
                    headKey="project-breadcrumb-jsonld"
                    data={breadcrumbData}
                />
            </SeoHead>

            <style>{`
/* show pages: hero aligns to bottom, not center */
.page-hero { align-items: flex-end; }

.project-detail {
  background: var(--color-background);
}

.gallery-main {
  border-radius: var(--radius-xl);
  overflow: hidden;
//   aspect-ratio: 4 / 3;
  margin-bottom: 1rem;

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
  color: var(--color-muted-foreground);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.industry-badge {
  display: inline-block;
  padding: 0.375rem 0.875rem;
  background: var(--color-secondary);
  border-radius: 100px;
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--color-secondary-foreground);
}

.specs-block {
  h3 {
    font-size: 1rem;
    font-weight: 700;
    margin-bottom: 1rem;
    padding-bottom: 0.75rem;
    border-bottom: 1px solid var(--color-border);
  }
}

.tags-block {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
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
      `}</style>
            <>
                <section className="page-hero">
                    <div className="hero-bg">
                        <img
                            src={project.cover_image?.originalUrl}
                            alt={project.title}
                        />
                        <div className="hero-overlay"></div>
                    </div>
                    <div className="hero-content container">
                        <Link href={projectsIndex()} className="back-link">
                            <ChevronLeft className="mr-2 h-4 w-4" />
                            Всички проекти
                        </Link>
                        <span className="hero-badge">
                            {project.category?.name}
                        </span>
                        <h1>{project.title}</h1>
                    </div>
                </section>
                <section className="section project-detail">
                    <div className="container">
                        <div className="detail-grid">
                            <div className="gallery">
                                <div className="gallery-main">
                                    <img
                                        src={activeImage}
                                        alt={project.title}
                                    />
                                </div>
                                {project.images.length > 0 && (
                                    <div className="gallery-thumbs">
                                        <button
                                            className={cn(
                                                'thumb',
                                                activeImageIndex === -1 &&
                                                    'active',
                                            )}
                                            key={
                                                project.cover_image?.id ||
                                                'cover'
                                            }
                                            onClick={() =>
                                                setActiveImageIndex(-1)
                                            }
                                        >
                                            <img
                                                src={
                                                    project.cover_image
                                                        ?.thumbUrl
                                                }
                                                alt={project.title + ' cover'}
                                                loading="lazy"
                                            />
                                        </button>
                                        {project.images.map((img, idx) => (
                                            <button
                                                className={cn(
                                                    'thumb',
                                                    activeImageIndex === idx &&
                                                        'active',
                                                )}
                                                key={img.id}
                                                onClick={() =>
                                                    setActiveImageIndex(idx)
                                                }
                                            >
                                                <img
                                                    src={img.thumbUrl}
                                                    alt={
                                                        project.title +
                                                        ' ' +
                                                        (idx + 1)
                                                    }
                                                    loading="lazy"
                                                />
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>

                            <div className="project-info">
                                <p className="project-desc">
                                    {project.description}
                                </p>

                                <div className="meta-row">
                                    <span className="meta-label">
                                        Категория
                                    </span>
                                    <span className="meta-value industry-badge">
                                        {project.category?.name}
                                    </span>
                                </div>

                                {project.specs.length > 0 && (
                                    <div className="specs-block">
                                        <h3>Технически детайли</h3>
                                        <table className="specs-table">
                                            <tbody>
                                                {project.specs.map((spec) => (
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
                                )}
                                {project.tags.length > 0 && (
                                    <div className="tags-block">
                                        {project.tags.map((tag) => (
                                            <span
                                                className="tag"
                                                key={tag.slug}
                                            >
                                                {tag.name}
                                            </span>
                                        ))}
                                    </div>
                                )}
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
        </>
    );
}
