import { NlpManager } from 'node-nlp';
import sharp from 'sharp';
import path from 'path';

class ContentModeration {
    static async initialize() {
        // NLP modelini başlat
        this.nlpManager = new NlpManager({ languages: ['tr'] });
        
        // Eğitim verilerini ekle
        this.nlpManager.addDocument('tr', 'küfür', 'offensive');
        this.nlpManager.addDocument('tr', 'hakaret', 'offensive');
        this.nlpManager.addDocument('tr', 'tehdit', 'offensive');
        this.nlpManager.addDocument('tr', 'şiddet', 'offensive');
        
        // Modeli eğit
        await this.nlpManager.train();
    }

    // Basit görsel moderasyon: uzantı, boyut ve renk analizi
    static async moderateImage(imageBuffer, filename = '') {
        try {
            // Dosya uzantısı kontrolü
            const allowedExtensions = ['.jpg', '.jpeg', '.png', '.gif'];
            const ext = path.extname(filename).toLowerCase();
            if (filename && !allowedExtensions.includes(ext)) {
                return {
                    isSafe: false,
                    reason: 'Desteklenmeyen dosya uzantısı',
                    details: { ext }
                };
            }
            // Boyut kontrolü (5MB üstü uygunsuz)
            if (imageBuffer.length > 5 * 1024 * 1024) {
                return {
                    isSafe: false,
                    reason: 'Dosya boyutu çok büyük',
                    details: { size: imageBuffer.length }
                };
            }
            // Renk analizi (çok koyu veya çok açık resimler uygunsuz olabilir)
            const image = sharp(imageBuffer);
            const { dominant } = await image.stats();
            const avg = (dominant.r + dominant.g + dominant.b) / 3;
            let isSafe = true;
            let reason = 'Uygun';
            if (avg < 30) {
                isSafe = false;
                reason = 'Çok koyu resim';
            } else if (avg > 225) {
                isSafe = false;
                reason = 'Çok açık resim';
            }
            return {
                isSafe,
                reason,
                details: { avgColor: avg }
            };
        } catch (error) {
            console.error('Görsel moderasyon hatası:', error);
            return {
                isSafe: false,
                reason: 'Görsel analiz hatası',
                details: { error: error.message }
            };
        }
    }

    static async moderateText(text) {
        try {
            // Metin analizi
            const result = await this.nlpManager.process('tr', text);
            
            // Duygu analizi için basit kelime kontrolü
            const offensiveWords = ['küfür', 'hakaret', 'tehdit', 'şiddet'];
            const containsOffensive = offensiveWords.some(word => 
                text.toLowerCase().includes(word)
            );

            return {
                sentiment: {
                    score: containsOffensive ? -1 : 1,
                    magnitude: 1
                },
                isAppropriate: !containsOffensive,
                offensiveWords: containsOffensive ? 
                    offensiveWords.filter(word => text.toLowerCase().includes(word)) : []
            };
        } catch (error) {
            console.error('Metin moderasyonu hatası:', error);
            throw error;
        }
    }
}

// Servisi başlat
ContentModeration.initialize().catch(console.error);

export default ContentModeration;