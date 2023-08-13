const HOST = 'http://localhost:5000';
const API_BASE = `${HOST}/api`;

interface NamedArray {
    [key: string]: string;
}

const CATEGORIES: NamedArray = {
    'fresh': 'Fresh Water',
    'salt': 'Salt Water',
    'brackish': 'Brackish Water'
}

export {
    HOST,
    API_BASE,
    CATEGORIES
}