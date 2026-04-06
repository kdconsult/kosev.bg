type JsonLdProps = {
    data: Record<string, unknown> | Array<Record<string, unknown>>;
    headKey?: string;
};

export function JsonLd({ data, headKey = 'json-ld' }: JsonLdProps) {
    return (
        <script
            head-key={headKey}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
        />
    );
}
