import OperaVersion from '../../modules/methods/OperaVersion';
jest.mock('../../modules/protected/_getBrowserVersion', () => {
    return {
        "default": (...args) => {
            return _getBrowserVersion.apply(this, args);
        }
    }
});
let _getBrowserVersion = () => { };
describe('OperaVersion', () => {
    beforeEach(() => {
        _getBrowserVersion = jest.fn().mockImplementationOnce(() => 1);
    })
    it('should return version of Opera Version', async () => {
        const dis = {};
        expect(OperaVersion.call(dis)).toBe(1);
        expect(_getBrowserVersion).toHaveBeenCalledWith(dis, 'Opera')
    })
});
