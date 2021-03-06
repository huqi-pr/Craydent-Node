const win = (global as any).window;
delete (global as any).window;
import requireDirectory from '../../modules/methods/requireDirectory';

jest.mock('fs', () => {
    return {
        "readdirSync": (...args) => readdirSync.apply(this, args),
        "statSync": (...args) => statSync.apply(this, args),
        "readdir": (...args) => readdir.apply(this, args),
        "stat": (...args) => stat.apply(this, args)
    }
});
jest.mock('../../modules/methods/absolutePath', () => {
    return {
        "default": (...args) => absolutePath.apply(this, args)
    }
});
jest.mock('../../modules/methods/include', () => {
    return {
        "default": (...args) => include.apply(this, args)
    }
});
let absolutePath = (path) => { }
let include = (name) => {
    return {
        "readdirSync": (...args) => readdirSync.apply(this, args),
        "statSync": (...args) => statSync.apply(this, args),
        "readdir": (...args) => readdir.apply(this, args),
        "stat": (...args) => stat.apply(this, args)
    }
}
let statSync = (path) => { }
let readdirSync = (path) => { }
let readdir = (path, cb) => { }
let stat = (path, cb) => { }

describe('requireDirectory', () => {
    afterAll(() => {
        if (win) { (global as any).window = win; }
    });
    beforeEach(() => {
        absolutePath = () => { }
        include = () => {
            return {
                "readdirSync": (...args) => readdirSync.apply(this, args),
                "statSync": (...args) => statSync.apply(this, args),
                "readdir": (...args) => readdir.apply(this, args),
                "stat": (...args) => stat.apply(this, args)
            }
        }
        statSync = () => { }
        readdirSync = () => { }
        stat = () => { }
        readdir = () => { }
    });
    describe('syncronous', () => {
        it('should require all files in a directory excluding files starting with . or _', () => {
            absolutePath = jest.fn((path) => '/absolute/./path/');
            include = jest.fn((name) => ({
                "readdirSync": (...args) => readdirSync.apply(this, args),
                "statSync": (...args) => statSync.apply(this, args),
                "readdir": (...args) => readdir.apply(this, args),
                "stat": (...args) => stat.apply(this, args)
            }));
            statSync = jest.fn((path) => ({ isDirectory: () => false }));
            readdirSync = jest.fn((path) => ['_file', '.file', 'thefile'])

            expect(requireDirectory('./path', 's')).toEqual({
                "/thefile": {
                    "readdirSync": expect.any(Function),
                    "statSync": expect.any(Function),
                    "readdir": expect.any(Function),
                    "stat": expect.any(Function)
                }
            });
        });

        it('should require all files in a directory excluding subdirectories and files starting with . or _', () => {
            absolutePath = jest.fn((path) => '/absolute/./path/');
            include = jest.fn((name) => ({
                "readdirSync": (...args) => readdirSync.apply(this, args),
                "statSync": (...args) => statSync.apply(this, args),
                "readdir": (...args) => readdir.apply(this, args),
                "stat": (...args) => stat.apply(this, args)
            }));
            statSync = jest.fn()
                .mockImplementationOnce((path) => ({ isDirectory: () => false }))
                .mockImplementationOnce((path) => ({ isDirectory: () => false }))
                .mockImplementationOnce((path) => ({ isDirectory: () => true }))
                .mockImplementationOnce((path) => ({ isDirectory: () => false }));
            readdirSync = jest.fn()
                .mockImplementationOnce((path) => ['_file', '.file', 'directory'])
                .mockImplementationOnce((path) => ['thefile']);

            expect(requireDirectory('./path', 's')).toEqual({});
        });
        it('should require all files in a directory recursively excluding files starting with . or _', () => {
            absolutePath = jest.fn((path) => '/absolute/./path/');
            include = jest.fn((name) => ({
                "readdirSync": (...args) => readdirSync.apply(this, args),
                "statSync": (...args) => statSync.apply(this, args),
                "readdir": (...args) => readdir.apply(this, args),
                "stat": (...args) => stat.apply(this, args)
            }));
            statSync = jest.fn()
                .mockImplementationOnce((path) => ({ isDirectory: () => false }))
                .mockImplementationOnce((path) => ({ isDirectory: () => false }))
                .mockImplementationOnce((path) => ({ isDirectory: () => true }))
                .mockImplementationOnce((path) => ({ isDirectory: () => false }));
            readdirSync = jest.fn()
                .mockImplementationOnce((path) => ['_file', '.file', 'directory'])
                .mockImplementationOnce((path) => ['thefile']);

            expect(requireDirectory('./path', 'sr')).toEqual({
                "/directory/thefile": {
                    "readdirSync": expect.any(Function),
                    "statSync": expect.any(Function),
                    "readdir": expect.any(Function),
                    "stat": expect.any(Function)
                }
            });
        });
    });
    describe('asyncronous', () => {
        it('should require all files in a directory excluding files starting with . or _', async () => {
            absolutePath = jest.fn((path) => '/absolute/./path/');
            include = jest.fn((name) => ({
                "readdirSync": (...args) => readdirSync.apply(this, args),
                "statSync": (...args) => statSync.apply(this, args),
                "readdir": (...args) => readdir.apply(this, args),
                "stat": (...args) => stat.apply(this, args)
            }));
            stat = jest.fn((path, cb) => cb(null, { isDirectory: () => false }));
            readdir = jest.fn((path, cb) => cb(null, ['_file', '.file', 'thefile']))

            expect(await requireDirectory('./path')).toEqual({
                "/thefile": {
                    "readdirSync": expect.any(Function),
                    "statSync": expect.any(Function),
                    "readdir": expect.any(Function),
                    "stat": expect.any(Function)
                }
            });
        });

        it('should require all files in a directory excluding subdirectories and files starting with . or _', async () => {
            absolutePath = jest.fn((path) => '/absolute/./path/');
            include = jest.fn((name) => ({
                "readdirSync": (...args) => readdirSync.apply(this, args),
                "statSync": (...args) => statSync.apply(this, args),
                "readdir": (...args) => readdir.apply(this, args),
                "stat": (...args) => stat.apply(this, args)
            }));
            stat = jest.fn()
                .mockImplementationOnce((path, cb) => cb(null, { isDirectory: () => false }))
                .mockImplementationOnce((path, cb) => cb(null, { isDirectory: () => false }))
                .mockImplementationOnce((path, cb) => cb(null, { isDirectory: () => true }))
                .mockImplementationOnce((path, cb) => cb(null, { isDirectory: () => false }));
            readdir = jest.fn()
                .mockImplementationOnce((path, cb) => cb(null, ['_file', '.file', 'directory']))
                .mockImplementationOnce((path, cb) => cb(null, ['thefile']));

            expect(await requireDirectory('./path')).toEqual({});
        });
        it('should require all files in a directory recursively excluding files starting with . or _', async () => {
            absolutePath = jest.fn((path) => '/absolute/./path/');
            include = jest.fn((name) => ({
                "readdirSync": (...args) => readdirSync.apply(this, args),
                "statSync": (...args) => statSync.apply(this, args),
                "readdir": (...args) => readdir.apply(this, args),
                "stat": (...args) => stat.apply(this, args)
            }));
            stat = jest.fn()
                .mockImplementationOnce((path, cb) => cb(null, { isDirectory: () => false }))
                .mockImplementationOnce((path, cb) => cb(null, { isDirectory: () => false }))
                .mockImplementationOnce((path, cb) => cb(null, { isDirectory: () => true }))
                .mockImplementationOnce((path, cb) => cb(null, { isDirectory: () => false }));
            readdir = jest.fn()
                .mockImplementationOnce((path, cb) => cb(null, ['_file', '.file', 'directory']))
                .mockImplementationOnce((path, cb) => cb(null, ['thefile']));

            expect(await requireDirectory('./path', 'r')).toEqual({
                "/directory/thefile": {
                    "readdirSync": expect.any(Function),
                    "statSync": expect.any(Function),
                    "readdir": expect.any(Function),
                    "stat": expect.any(Function)
                }
            });
        });
    });
});