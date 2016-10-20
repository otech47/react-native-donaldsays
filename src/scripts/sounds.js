import Sound from 'react-native-sound';

let sounds = {
    hits: [
        new Sound('bigchina.mp3', Sound.MAIN_BUNDLE),
        new Sound('bomb.mp3', Sound.MAIN_BUNDLE),
        new Sound('fired.mp3', Sound.MAIN_BUNDLE),
        new Sound('grab.mp3', Sound.MAIN_BUNDLE),
        new Sound('oyaye.mp3', Sound.MAIN_BUNDLE),
        new Sound('rich.mp3', Sound.MAIN_BUNDLE),
        new Sound('founder.m4a', Sound.MAIN_BUNDLE),
        new Sound('mexicans.m4a', Sound.MAIN_BUNDLE),
        new Sound('titties.m4a', Sound.MAIN_BUNDLE)
    ],
    laser: new Sound('laser.wav', Sound.MAIN_BUNDLE),
    lose: new Sound('lose.wav', Sound.MAIN_BUNDLE),
    win: new Sound('win.wav', Sound.MAIN_BUNDLE)
};

export function playSound(name) {
    sounds.laser.setVolume(0.03);
    sounds[name].play();
}

export function playRandomHitSound() {
    sounds.laser.setVolume(0.03);
    let index = Math.floor(Math.random() * sounds.hits.length)
    sounds.hits[index].play();
}

export function stopSound(name) {
    sounds[name].stop();
}