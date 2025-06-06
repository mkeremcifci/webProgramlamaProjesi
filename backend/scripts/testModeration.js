import ContentModeration from '../utils/contentModeration.js';
import { promises as fs } from 'fs';

async function testModeration() {
    try {
        // Metin moderasyonu testi
        console.log('Metin Moderasyonu Testi:');
        const textResults = await ContentModeration.moderateText('Bu bir test mesajıdır.');
        console.log('Normal metin sonucu:', textResults);

        const offensiveTextResults = await ContentModeration.moderateText('Bu mesaj küfür ve şiddet içeriyor.');
        console.log('Uygunsuz metin sonucu:', offensiveTextResults);

        // Görüntü moderasyonu testi
        console.log('\nGörüntü Moderasyonu Testi:');
        const testImagePath = './test-images/test.jpg'; // Test için bir görüntü yolu
        try {
            const imageBuffer = await fs.readFile(testImagePath);
            const imageResults = await ContentModeration.moderateImage(imageBuffer, 'test.jpg');
            console.log('Görüntü moderasyonu sonucu:', imageResults);
        } catch (error) {
            console.log('Görüntü testi için test görüntüsü bulunamadı.');
        }

        // Uzantı testi
        const fakeBuffer = Buffer.alloc(1000);
        const fakeResult = await ContentModeration.moderateImage(fakeBuffer, 'test.exe');
        console.log('Geçersiz uzantı sonucu:', fakeResult);

        // Boyut testi
        const bigBuffer = Buffer.alloc(6 * 1024 * 1024);
        const bigResult = await ContentModeration.moderateImage(bigBuffer, 'test.jpg');
        console.log('Büyük dosya sonucu:', bigResult);

    } catch (error) {
        console.error('Test sırasında hata:', error);
    }
}

// Testi çalıştır
testModeration();