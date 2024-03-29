export const CONTACTINFO = {
    ADDRESS: '123 Street, New York, USA',
    EMAIL: 'info@example.com',
    PHONE: '+123 456 7890',
};

export const QUICKSHOPLINKS = [
    { LABEL: 'Home', PATH: '/' },
    { LABEL: 'Our Shop', PATH: '/shop' },
    { LABEL: 'Shop Detail', PATH: '#' },
    { LABEL: 'Shopping Cart', PATH: '#' },
    { LABEL: 'Checkout', PATH: '#' },
    { LABEL: 'Contact Us', PATH: '#' },
]

export const MYACCOUNTLINK = {
    LOGED: [
        { LABEL: 'Manage Account', PATH: '/account' },
        { LABEL: 'Log out', PATH: '/' },
    ],

    UNLOG: [
        { LABEL: 'Sign in', PATH: '/login' },
        { LABEL: 'Sign up', PATH: '/signup' },
    ]
}

export const HOMEFEATURE = [
    { LABEL: 'Quality Product', CLASS: 'fa fa-check text-primary m-0 mr-3' },
    { LABEL: 'Free Shipping', CLASS: 'fa fa-shipping-fast text-primary m-0 mr-2' },
    { LABEL: '14-Day Return', CLASS: 'fas fa-exchange-alt text-primary m-0 mr-3' },
    { LABEL: '24/7 Support', CLASS: 'fa fa-phone-volume text-primary m-0 mr-3' },
]

export const SIDEBAR_FILTER = [
    {
        TITLE: 'Category', DATA: 'category', ATR: 'cate', ID: 'cate-', LABEL: 'cateName',
    },
    {
        TITLE: 'Brand', DATA: 'brand', ATR: 'brand', ID: 'brand-', LABEL: 'brandName'
    }
]

export const PRICERANGE = [
    { INDEX: '1', LABEL: '$0 - $20', VALUE: '[0,20]' },
    { INDEX: '2', LABEL: '$20 - $40', VALUE: '[20,40]' },
    { INDEX: '3', LABEL: '$40 - $60', VALUE: '[40,60]' },
    { INDEX: '4', LABEL: '$60 - $80', VALUE: '[60,80]' },
    { INDEX: '5', LABEL: '$80 - $100', VALUE: '[80,100]' },
]

export const SORT_TYPE = {
    DEFAULT: 0,
    HIGHEST: 1,
    LOWEST: -1,
};

export const socialNetworks = [
    {
        name: "Facebook",
        icon: "fab fa-facebook-f",
        link: "https://www.facebook.com/quochoang.nguyen.50767",
    },
    {
        name: "Twitter",
        icon: "fab fa-twitter",
        link: "https://twitter.com/Cleny393976",
    },
    {
        name: "Instagram",
        icon: "fab fa-instagram",
        link: "https://www.instagram.com/h.031511?fbclid=IwAR2HPrmoil7YY7sLEYiStevdH1sjaf2MYFJQc-pYaQSvdUM_8-7U4enEfSY",
    },
];

export const signup = [
    {
        NAME: 'username',
        TYPE: 'text',
        PLACEHOLDER: 'Username',
    },
    {
        NAME: 'fullname',
        TYPE: 'text',
        PLACEHOLDER: 'Full name'
    },
    {
        NAME: 'email',
        TYPE: 'email',
        PLACEHOLDER: 'Email'
    },
    {
        NAME: 'phonenum',
        TYPE: 'text',
        PLACEHOLDER: 'Phone number'
    },
    {
        NAME: 'password',
        TYPE: 'password',
        PLACEHOLDER: 'Password'
    },
    {
        NAME: 're_password',
        TYPE: 'password',
        PLACEHOLDER: 'Confirm Password'
    }
]

export const PATTERN = {
    EMAIL: /^[a-zA-Z][a-zA-Z0-9._%+-]+@[^\s@]+\.[^\s@]{2,}$/,
    PHONE: /^0\d{9}$/,
    PASSWORD: /(?=.*[A-Z])(?=.*[!@#$%^&*])(.{8,})/
}

export const ERROR_MESSAGE = {
    REQUIRE: "This information is required!",

    SIGNUP: {
        USERNAME: "Username must be from 3 to 20 characters!",
        USERNAME_EXIST: "Username already exists!",
        FULLNAME: "Your full name must be less than 50 characters!",
        EMAIL: "Invalid email address!",
        PHONE: "Phone number is invalid!",
        PASSWORD: "Password must be 8+ chars, uppercase, special char!",
        RE_PASSWORD: 'The confirm password does not match!'
    },

    LOGIN: {
        USERNAME: "Username can not more than 20 characters!",
        PASSWORD: "Password must be at least 8 characters long!",
        LOGIN_FAIL: "Username or password is incorrect!"
    }
}

export const DEVICE = {
    PC: 0,
    MOBILE: 1
}

export const DEVICE_TYPE = (() => {
    const userAgent = navigator.userAgent.toLowerCase();
    const isMobile = /iphone|ipad|ipod|android|blackberry|mini|windows\sce|palm/i.test(userAgent);
    return isMobile ? DEVICE.MOBILE : DEVICE.PC;
})();

export const PRODUCT_SHOWING = [
    { VALUE: 4 },
    { VALUE: 8 },
    { VALUE: 12 },
];
