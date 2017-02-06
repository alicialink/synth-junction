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

    def normalize_to_max_vol(self):
        intermediate = (self.waveform / np.max(self.waveform)) * self.max_vol
        return self

    def write_to_wav_file(self, filename):
        intermediate = np.int16(self.waveform * 32767)
        write(filename, self.sps, intermediate)
        return self


if __name__ == "__main__":
    p = Pipeline(44100, 1.0, 0.5)
