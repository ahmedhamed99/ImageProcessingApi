import supertest from 'supertest';
import app from '../index';

const request = supertest(app);

describe('Test endpoint responses', () => {
    it('check response status code when given full url with parameters', async () => {
        const response = await request.get('/api/images?filename=fjord&width=200&height=300');
        expect(response.statusCode).toEqual(200);
    }
    );
    it('check it dislplaye Error: Input file missing when given url without filename parameter', async () => {
        const response = await request.get('/api/images?width=200&height=300');
        expect(response.text).toBe('Error: Input file missing');
    }
    );
    it('check it dislplaye Error: width missing when given url without width parameter', async () => {
        const response = await request.get('/api/images?filename=fjord&height=300');
        expect(response.text).toBe('Error: Width missing');
    }
    );
    it('check it dislplaye Error: Height missing when given url without height parameter', async () => {
        const response = await request.get('/api/images?filename=fjord&width=200');
        expect(response.text).toBe('Error: Height missing');
    }
    );
    it('check it dislplaye Error: Input file is missing: assets/full/jord.jpg when given wrong file name', async () => {
        const response = await request.get('/api/images?filename=jord&width=200&height=300');
        expect(response.text).toBe('Input file is missing: assets/full/jord.jpg');
    }
    );
});