// Script to create placeholder sound files
// Run: node create-sounds.js

const fs = require('fs');
const path = require('path');

// Minimal WAV file header for a short beep
function createWavBuffer(frequency, duration, sampleRate = 44100) {
  const numSamples = sampleRate * duration;
  const buffer = Buffer.alloc(44 + numSamples * 2);

  // WAV header
  buffer.write('RIFF', 0);
  buffer.writeUInt32LE(36 + numSamples * 2, 4);
  buffer.write('WAVE', 8);
  buffer.write('fmt ', 12);
  buffer.writeUInt32LE(16, 16);
  buffer.writeUInt16LE(1, 20); // PCM
  buffer.writeUInt16LE(1, 22); // Mono
  buffer.writeUInt32LE(sampleRate, 24);
  buffer.writeUInt32LE(sampleRate * 2, 28);
  buffer.writeUInt16LE(2, 32);
  buffer.writeUInt16LE(16, 34);
  buffer.write('data', 36);
  buffer.writeUInt32LE(numSamples * 2, 40);

  // Generate sine wave
  for (let i = 0; i < numSamples; i++) {
    const t = i / sampleRate;
    const sample = Math.sin(2 * Math.PI * frequency * t) * 0.5;
    const value = Math.floor(sample * 32767);
    buffer.writeInt16LE(value, 44 + i * 2);
  }

  return buffer;
}

// Create laser sound (high pitch, short)
const laser = createWavBuffer(880, 0.1);
fs.writeFileSync(path.join(__dirname, 'assets', 'sounds', 'laser.wav'), laser);

// Create explosion sound (low pitch, longer)
const explosion = createWavBuffer(110, 0.3);
fs.writeFileSync(path.join(__dirname, 'assets', 'sounds', 'explosion.wav'), explosion);

console.log('✅ Created placeholder sound files:');
console.log('   - assets/sounds/laser.wav');
console.log('   - assets/sounds/explosion.wav');
console.log('');
console.log('Note: These are simple beeps. Replace with real sounds for better体验!');
