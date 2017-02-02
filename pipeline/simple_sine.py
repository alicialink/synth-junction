import numpy as np
from scipy.io.wavfile import write

if __name__ == "__main__":
    sps = 44100
    freq = 440
    duration_s = 1.0

    each_sample_number = np.arange(sps * duration_s)
    waveform = np.sin(2 * np.pi * each_sample_number * freq / sps)

    waveform_integers = np.int16(waveform * 32767)

    write('test.wav', 44100, waveform_integers)

    print "Wrote test.wav"
