import isMobile from '../../modules/methods/isMobile';
describe('isMobile', () => {
    it('should check if browser is Mobile', () => {
        // expect(isMobile.call({ navigator: { userAgent: 'android' } })).toBe(true);
        // expect(isMobile.call({ navigator: { userAgent: 'blackberry' } })).toBe(true);
        // expect(isMobile.call({ navigator: { userAgent: 'ipad' } })).toBe(true);
        // expect(isMobile.call({ navigator: { userAgent: 'iphone' } })).toBe(true);
        // expect(isMobile.call({ navigator: { userAgent: 'ipod' } })).toBe(true);
        // expect(isMobile.call({ navigator: { userAgent: 'palm' } })).toBe(true);
        expect(isMobile.call({ navigator: { userAgent: 'webkit symbian' } })).toBe(true);
        expect(isMobile.call({ navigator: { userAgent: 'windows ce' } })).toBe(true);
        expect(isMobile.call({ navigator: { userAgent: 'webkit khtml' } })).toBe(false);
    });
});
