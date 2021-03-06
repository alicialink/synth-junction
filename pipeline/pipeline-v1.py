import numpy as np
from scipy.io.wavfile import write

# sps: Samples per second
# duration_s: Duration in seconds


class Pipeline:
    def __init__(self, sps, duration_s, max_vol):
        self.sps = sps
        self.max_vol = max_vol
        self.each_sample_number = np.arange(sps * duration_s)
        self.waveform = np.zeros((self.each_sample_number.size))

    def add_sines(self, freqs):
        for freq in freqs:
            intermediate = np.sin(2 * np.pi * self.each_sample_number * freq / self.sps)
            self.waveform = np.add(self.waveform, intermediate)
        return self

    def amplitudeModulate(self, freq):
        modulator = np.sin(2 * np.pi * self.each_sample_number * freq / self.sps)
        self.waveform = np.multiply(self.waveform, modulator)
        return self

    def normalize_to_max_vol(self):
        intermediate = (self.waveform / np.max(self.waveform))
        self.waveform = intermediate * self.max_vol
        return self

    def write_to_wav_file(self, filename):
        intermediate = np.int16(self.waveform * 32767)
        write(filename, self.sps, intermediate)
        return self


if __name__ == "__main__":
    fundamental = 432
    duration = 10.0
    vol_level = 0.17
    sps = 44100
    max_freq = 20000
    max_harmomic = int(max_freq // fundamental) + 1

    sine = Pipeline(sps, duration, vol_level)
    sine.add_sines([fundamental])
    sine.normalize_to_max_vol()
    sine.write_to_wav_file("test-pipeline-sine.wav")
    print "Wrote the sine wave"

    am_sine = Pipeline(sps, duration, vol_level)
    am_sine.add_sines([fundamental])
    am_sine.amplitudeModulate(2)
    am_sine.normalize_to_max_vol()
    am_sine.write_to_wav_file("test-pipeline-AM-sine.wav")
    print "Wrote the AM sine wave"

    am_am_sine = Pipeline(sps, duration, vol_level)
    am_am_sine.add_sines([fundamental])
    am_am_sine.amplitudeModulate(3)
    am_am_sine.amplitudeModulate(1)
    am_am_sine.normalize_to_max_vol()
    am_am_sine.write_to_wav_file("test-pipeline-AM-AM-sine.wav")
    print "Wrote the AM AM sine wave"

    squarish_freqs = [h * fundamental for h in range(1, 10) if h == 1 or h % 2 == 1]
    squarish = Pipeline(sps, duration, vol_level)
    squarish.add_sines(squarish_freqs)
    squarish.normalize_to_max_vol()
    squarish.write_to_wav_file("test-pipeline-squarish.wav")
    print "Wrote the squarish wave"

    squarish_freqs = [h * fundamental for h in range(1, 10) if h == 1 or h % 2 == 1]
    am_am_squarish = Pipeline(sps, duration, vol_level)
    am_am_squarish.add_sines(squarish_freqs)
    am_am_squarish.amplitudeModulate(3)
    am_am_squarish.amplitudeModulate(1)
    am_am_squarish.normalize_to_max_vol()
    am_am_squarish.write_to_wav_file("test-pipeline-AM-AM-squarish.wav")
    print "Wrote the AM AM squarish wave"
