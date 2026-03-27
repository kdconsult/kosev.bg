export interface Certificate {
  id: string;
  name: string;
  description: string;
  imagePath: string;
  pdfPath: string;
}

export const certificatesData: Certificate[] = [
  {
    id: "iso-9001",
    name: "ISO 9001:2015",
    description:
      "Система за управление на качеството. Стандартът гарантира, че всички наши производствени процеси са строго контролирани и отговарят на международните изисквания за качество.",
    imagePath:
      "https://kosev.bg/wp-content/uploads/2026/02/ISO-9001-2015-en-440x550.jpg",
    pdfPath: "https://kosev.bg/wp-content/uploads/2026/02/ISO-9001-2015-en.pdf",
  },
  {
    id: "iso-14001",
    name: "ISO 14001:2015",
    description:
      "Система за управление на околната среда. Ангажираме се с намаляване на въздействието върху околната среда чрез ефективно управление на отпадъците и ресурсите.",
    imagePath:
      "https://kosev.bg/wp-content/uploads/2026/02/Certificate-of-conformity-of-the-factory-production-control-1-440x550.jpg",
    pdfPath:
      "https://kosev.bg/wp-content/uploads/2026/02/Certificate-of-conformity-of-the-factory-production-control.pdf",
  },
  {
    id: "en-1090",
    name: "EN 1090",
    description:
      "Сертификат за изпълнение на стоманени конструкции. Позволява ни да произвеждаме и доставяме конструктивни стоманени елементи с CE маркировка за целия Европейски съюз.",
    imagePath:
      "https://kosev.bg/wp-content/uploads/2026/02/Welding-Certoficate-1-440x550.jpg",
    pdfPath:
      "https://kosev.bg/wp-content/uploads/2026/02/Welding-Certoficate.pdf",
  },
  {
    id: "iso-3834",
    name: "ISO 3834-2",
    description:
      "Изисквания за качество при заваряване. Сертификатът обхваща всички заваръчни процеси в нашето производство и доказва компетентността на нашите сертифицирани заварчици.",
    imagePath:
      "https://kosev.bg/wp-content/uploads/2026/02/3834-2-eng-440x550.jpg",
    pdfPath: "https://kosev.bg/wp-content/uploads/2026/02/3834-2-eng.pdf",
  },
];
