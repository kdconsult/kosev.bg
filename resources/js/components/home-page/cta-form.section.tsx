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

    function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
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
        <section className="py-24 bg-[#faf8f5]">
            <div className="max-w-7xl mx-auto px-6">
                <div className="lg:grid lg:grid-cols-[1fr_1.2fr] lg:gap-16 lg:items-center">
                    <div className="mb-12 lg:mb-0">
                        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-gold">
                            Свържете се с нас
                        </span>
                        <h2 className="text-[2rem] md:text-[2.5rem] font-normal mt-3 mb-4 text-gray-900 leading-[1.2]">
                            Готови да обсъдим вашия проект?
                        </h2>
                        <p className="text-gray-500 leading-relaxed mb-10">
                            Изпратете ни запитване и нашият екип ще се свърже с вас в рамките на
                            24 часа.
                        </p>

                        <div className="space-y-6">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-brand-gold/10 flex items-center justify-center flex-shrink-0 text-brand-gold">
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
                                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.21 12 19.79 19.79 0 0 1 1.14 3.38 2 2 0 0 1 3.12 1h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                                    </svg>
                                </div>
                                <div>
                                    <span className="block text-xs text-gray-400 uppercase tracking-wide mb-0.5">
                                        Телефон
                                    </span>
                                    <span className="block text-gray-900 font-medium">
                                        +359 88 123 4567
                                    </span>
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-brand-gold/10 flex items-center justify-center flex-shrink-0 text-brand-gold">
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
                                        <rect width="20" height="16" x="2" y="4" rx="2" />
                                        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                                    </svg>
                                </div>
                                <div>
                                    <span className="block text-xs text-gray-400 uppercase tracking-wide mb-0.5">
                                        Имейл
                                    </span>
                                    <span className="block text-gray-900 font-medium">
                                        marketing@kosev.bg
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg border border-gray-200 p-8 shadow-lg">
                        <form onSubmit={handleSubmit}>
                            <h3 className="text-xl font-medium text-gray-900 mb-6">
                                Изпратете запитване
                            </h3>

                            <div className="grid sm:grid-cols-2 gap-4 mb-4">
                                <div>
                                    <label
                                        htmlFor="name"
                                        className="block text-sm font-medium text-gray-700 mb-1.5"
                                    >
                                        Име *
                                    </label>
                                    <input
                                        id="name"
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder="Вашето име"
                                        required
                                        className="w-full px-4 py-2.5 border border-gray-200 rounded-md text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-gray-900 transition-colors duration-200"
                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor="company"
                                        className="block text-sm font-medium text-gray-700 mb-1.5"
                                    >
                                        Фирма
                                    </label>
                                    <input
                                        id="company"
                                        type="text"
                                        name="company"
                                        value={formData.company}
                                        onChange={handleChange}
                                        placeholder="Име на фирмата"
                                        className="w-full px-4 py-2.5 border border-gray-200 rounded-md text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-gray-900 transition-colors duration-200"
                                    />
                                </div>
                            </div>

                            <div className="mb-4">
                                <label
                                    htmlFor="email"
                                    className="block text-sm font-medium text-gray-700 mb-1.5"
                                >
                                    Имейл *
                                </label>
                                <input
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="email@company.com"
                                    required
                                    className="w-full px-4 py-2.5 border border-gray-200 rounded-md text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-gray-900 transition-colors duration-200"
                                />
                            </div>

                            <div className="mb-6">
                                <label
                                    htmlFor="message"
                                    className="block text-sm font-medium text-gray-700 mb-1.5"
                                >
                                    Описание на проекта *
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    rows={4}
                                    placeholder="Опишете накратко вашите изисквания..."
                                    required
                                    className="w-full px-4 py-2.5 border border-gray-200 rounded-md text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-gray-900 transition-colors duration-200 resize-none"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-gray-900 text-white text-sm font-medium rounded-md hover:bg-gray-800 transition-colors duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
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
    );
}
