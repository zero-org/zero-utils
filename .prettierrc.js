module.exports = {
    singleQuote: true,
    semi: false,
    tabWidth: 4,
    endOfLine: 'lf', // lf-mac crlf-win
    overrides: [
        {
            files: '*.yml',
            options: {
                tabWidth: 2,
            },
        },
    ],
}
