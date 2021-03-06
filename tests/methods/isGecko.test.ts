import isGecko from '../../modules/methods/isGecko';
describe('isGecko', () => {
    it('should check if browser is Gecko', () => {
        expect(isGecko.call({ navigator: { userAgent: 'gecko' } })).toBe(true);
        expect(isGecko.call({ navigator: { userAgent: 'webkit gecko' } })).toBe(false);
        expect(isGecko.call({ navigator: { userAgent: 'khtml gecko' } })).toBe(false);
    });
});
