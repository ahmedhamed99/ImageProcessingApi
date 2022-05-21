import resize from '../../routes/imageProcessing';
import app from '../../index';

describe('Testing the resizing function', () => {
    it('expects the fucntion to create a new image with the resized width and height', () => {
        const response = app.get('/api/images?filename=fjord&width=200&height=300');
        const result = resize('fjord', 200, 300, response);
        expect(result).not.toBeFalsy();
    });
});