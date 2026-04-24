import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';
import { JsonLd } from '@/components/json-ld';
import { SeoHead } from '@/components/seo-head';
import { cn } from '@/lib/utils';
import { contacts } from '@/routes';
import { index, show } from '@/routes/projects';
import type { Category, Project } from '@/types';

export default function ProjectsList({
    projects,
    categories,
}: {
    projects: Project[];
    categories: Category[];
}) {
    const { appUrl, seo } = usePage().props as {
        appUrl: string;
        seo: { projects: { title: string; description: string } };
    };
    const [activeFilter, setActiveFilter] = useState('all');
    const filters = [
        { id: 'all', label: 'Всички' },
        ...categories.map((c) => ({ id: c.slug, label: c.name })),
    ];

    const breadcrumbData = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Начало', item: appUrl },
            {
                '@type': 'ListItem',
                position: 2,
                name: seo.projects.title,
                item: `${appUrl}/projects`,
            },
        ],
    };

    const filteredProjects =
        activeFilter === 'all'
            ? projects
            : projects.filter(
                  (project) => project.category.slug === activeFilter,
              );

    return (
        <>
            <SeoHead
                title={seo.projects.title}
                description={seo.projects.description}
            >
                <JsonLd
                    headKey="projects-breadcrumb-jsonld"
                    data={breadcrumbData}
                />
            </SeoHead>
            <style>
                {`
    .projects-grid {
      display: grid;
      gap: 2rem;

      @media (min-width: 640px) {
        grid-template-columns: repeat(2, 1fr);
      }

      @media (min-width: 1024px) {
        grid-template-columns: repeat(3, 1fr);
      }
    }

    .project-card {
      background: var(--color-card);
      border-radius: var(--radius-xl);
      overflow: hidden;
      border: 1px solid var(--color-border);
      transition: all 0.3s ease;
      text-decoration: none;
      color: inherit;
      display: flex;
      flex-direction: column;

      &:hover {
        box-shadow: var(--shadow-xl);
        transform: translateY(-4px);

        .project-image img {
          transform: scale(1.05);
        }

        .view-link {
          color: var(--color-brand-gold);
        }
      }
    }

    .project-image {
      position: relative;
      overflow: hidden;
      aspect-ratio: 4 / 3;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.5s ease;
      }
    }

    .project-overlay {
      position: absolute;
      top: 1rem;
      left: 1rem;
    }

    .project-category {
      display: inline-block;
      padding: 0.375rem 0.75rem;
      background: rgba(0, 0, 0, 0.6);
      backdrop-filter: blur(4px);
      border-radius: 100px;
      font-size: 0.75rem;
      font-weight: 500;
      color: var(--color-white);
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    .project-content {
      padding: 1.5rem;
      display: flex;
      flex-direction: column;
      flex: 1;

      h3 {
        font-size: 1.125rem;
        margin-bottom: 0.5rem;
      }

      p {
        font-size: 0.9375rem;
        line-height: 1.6;
        margin-bottom: 1rem;
      }
    }

    .project-tags {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
      margin-bottom: 1rem;
    }

    .view-link {
      font-size: 0.875rem;
      font-weight: 600;
      color: var(--color-primary);
      transition: color 0.2s ease;
      margin-top: auto;
    }
    `}
            </style>
            <section className="page-hero">
                <div className="hero-bg">
                    <img
                        src="https://kosev.bg/wp-content/uploads/2019/09/top-banner-2.jpg"
                        alt="Метално производство"
                    />
                    <div className="hero-overlay"></div>
                </div>
                <div className="hero-content container">
                    <span className="hero-badge">Нашите проекти</span>
                    <h1>Примери от нашето производство</h1>
                    <p>
                        Разгледайте избрани проекти от нашето портфолио - от
                        детайли за автомобилната индустрия до сложни метални
                        конструкции.
                    </p>
                </div>
            </section>

            <section className="section projects">
                <div className="container">
                    <div className="filter-bar">
                        {filters.map((filter) => (
                            <button
                                className={cn('filter-btn', {
                                    active: activeFilter === filter.id,
                                })}
                                onClick={() => setActiveFilter(filter.id)}
                                key={filter.id}
                            >
                                {filter.label}
                            </button>
                        ))}
                    </div>

                    <div className="projects-grid">
                        {filteredProjects.map((project) => (
                            <Link
                                className="project-card"
                                href={show(project.slug)}
                                key={project.slug}
                            >
                                <div className="project-image">
                                    <img
                                        src={project.cover_image?.thumbUrl}
                                        alt={project.title}
                                        loading="lazy"
                                    />
                                    <div className="project-overlay">
                                        <span className="project-category">
                                            {project.category.name}
                                        </span>
                                    </div>
                                </div>
                                <div className="project-content">
                                    <h3>{project.title}</h3>
                                    <p>{project.short_description}</p>
                                    <div className="project-tags">
                                        {project.tags.map((tag) => (
                                            <span
                                                className="tag"
                                                key={tag.slug}
                                            >
                                                {tag.name}
                                            </span>
                                        ))}
                                    </div>
                                    <span className="view-link">
                                        Виж детайли →
                                    </span>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            <section className="cta-banner">
                <div className="container">
                    <div className="cta-content">
                        <h2>Имате проект за реализация?</h2>
                        <p>
                            Свържете се с нас и ще ви помогнем да го
                            осъществите.
                        </p>
                    </div>
                    <Link href={contacts()} className="btn btn-accent btn-lg">
                        Изпрати запитване
                    </Link>
                </div>
            </section>
        </>
    );
}

ProjectsList.layout = {
    breadcrumbs: [
        {
            title: 'Проекти',
            href: index(),
        },
    ],
};
