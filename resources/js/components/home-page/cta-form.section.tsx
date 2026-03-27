import { useState } from 'react';

const defaultFormData = {
    name: '',
    company: '',
    email: '',
    message: '',
};

export default function CtaFormSection() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState(defaultFormData);

    function handleChange(
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    }

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setIsSubmitting(true);
        setTimeout(() => {
            setIsSubmitting(false);
            alert('Благодарим ви за запитването! Ще се свържем с вас скоро.');
            setFormData(defaultFormData);
        }, 1500);
    }

    return (
        <>
            <style>
                {`
                .cta-form {
  background: var(--color-cream);
}

.cta-wrapper {
  display: grid;
  gap: 3rem;
  align-items: center;

  @media (min-width: 1024px) {
    grid-template-columns: 1fr 1.2fr;
    gap: 5rem;
  }
}

.cta-content {
  h2 {
    margin-bottom: 1.25rem;
    text-wrap: balance;
  }

  > p {
    font-size: 1.0625rem;
    color: var(--color-gray-500);
    line-height: 1.8;
    margin-bottom: 2.5rem;
  }
}

.cta-info {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.info-item {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.info-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: var(--radius-md);
  background: var(--color-white);
  color: var(--color-brand-gold);
  border: 1px solid var(--color-gray-200);
}

.info-text {
  display: flex;
  flex-direction: column;
}

.info-label {
  font-size: 0.8125rem;
  color: var(--color-gray-400);
}

.info-value {
  font-size: 1rem;
  font-weight: 500;
  color: var(--color-gray-900);
}

.cta-form-card {
  background: var(--color-white);
  border-radius: var(--radius-lg);
  padding: 2.5rem;
  box-shadow: var(--shadow-lg);
  border: 1px solid var(--color-gray-100);

  @media (min-width: 768px) {
    padding: 3rem;
  }

  h3 {
    font-size: 1.5rem;
    color: var(--color-gray-900);
    margin-bottom: 2rem;
  }
}

.form-row {
  display: grid;
  gap: 1rem;
  margin-bottom: 1rem;

  @media (min-width: 640px) {
    grid-template-columns: 1fr 1fr;
  }
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1rem;

  label {
    font-size: 0.875rem;
    font-weight: 500;
    color: var(--color-gray-700);
  }

  input,
  textarea {
    padding: 0.875rem 1rem;
    border: 1px solid var(--color-gray-200);
    border-radius: var(--radius-md);
    font-size: 1rem;
    font-family: var(--font-sans);
    color: var(--color-gray-900);
    background: var(--color-white);
    transition: all 0.2s ease;

    &::placeholder {
      color: var(--color-gray-400);
    }

    &:focus {
      outline: none;
      border-color: var(--color-gray-900);
    }
  }

  textarea {
    resize: vertical;
    min-height: 120px;
  }
}

.submit-btn {
  width: 100%;
  margin-top: 0.5rem;

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
}
`}
            </style>
            <section className="section cta-form">
                <div className="container">
                    <div className="cta-wrapper">
                        <div className="cta-content">
                            <span className="section-subtitle">
                                Свържете се с нас
                            </span>
                            <h2>Готови да обсъдим вашия проект?</h2>
                            <p>
                                Изпратете ни запитване и нашият екип ще се
                                свърже с вас в рамките на 24 часа.
                            </p>

                            <div className="cta-info">
                                <div className="info-item">
                                    <div className="info-icon">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="20"
                                            height="20"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        >
                                            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                                        </svg>
                                    </div>
                                    <div className="info-text">
                                        <span className="info-label">
                                            Телефон
                                        </span>
                                        <span className="info-value">
                                            +359 88 123 4567
                                        </span>
                                    </div>
                                </div>
                                <div className="info-item">
                                    <div className="info-icon">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="20"
                                            height="20"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        >
                                            <rect
                                                width="20"
                                                height="16"
                                                x="2"
                                                y="4"
                                                rx="2"
                                            />
                                            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                                        </svg>
                                    </div>
                                    <div className="info-text">
                                        <span className="info-label">
                                            Имейл
                                        </span>
                                        <span className="info-value">
                                            marketing&#64;kosev.bg
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="cta-form-card">
                            <form onSubmit={handleSubmit}>
                                <h3>Изпратете запитване</h3>

                                <div className="form-row">
                                    <div className="form-group">
                                        <label htmlFor="name">Име *</label>
                                        <input
                                            type="text"
                                            id="name"
                                            value={formData.name}
                                            name="name"
                                            placeholder="Вашето име"
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="company">Фирма</label>
                                        <input
                                            type="text"
                                            id="company"
                                            value={formData.company}
                                            name="company"
                                            placeholder="Име на фирмата"
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="email">Имейл *</label>
                                    <input
                                        type="email"
                                        id="email"
                                        value={formData.email}
                                        name="email"
                                        placeholder="email&#64;company.com"
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="message">
                                        Описание на проекта *
                                    </label>
                                    <textarea
                                        id="message"
                                        value={formData.message}
                                        name="message"
                                        rows={4}
                                        placeholder="Опишете накратко вашите изисквания..."
                                        onChange={handleChange}
                                        required
                                    ></textarea>
                                </div>

                                <button
                                    type="submit"
                                    className="btn btn-accent btn-lg submit-btn"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? (
                                        <span>Изпращане...</span>
                                    ) : (
                                        <>
                                            <span>Изпрати запитване</span>
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="18"
                                                height="18"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            >
                                                <path d="M5 12h14" />
                                                <path d="m12 5 7 7-7 7" />
                                            </svg>
                                        </>
                                    )}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
