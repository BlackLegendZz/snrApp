from math import sqrt
from datatypes import *


def calculateSNR(imageStats: ImageStatistics, camera: Camera, newExposure: int | None = None) -> float:
    """Calculates the Signal-to-Noise ratio of a lightframe based on information about the targets and backgrounds
    brightness, as well as camera settings and calibration frames.

    Args: imageStats (ImageStatistics): Information about the lightframe and calibration frames (dark and bias)
    camera (Camera): The used camera newExposure (int | None, optional): Required to re-calculate the SNR based on an
    exposure different from the original one. Defaults to None.

    Returns:
        float: The Signal-to-Noise ratio of a light frame
    """
    if imageStats.SkyglowBackground >= imageStats.TargetSignal:
        return -1

    eDarkSignal = (imageStats.DarkSignal - imageStats.BiasSignal) * camera.Gain
    eSkyglowSignal = (imageStats.SkyglowBackground - imageStats.DarkSignal) * camera.Gain
    eTargetSignal = (imageStats.TargetSignal - imageStats.SkyglowBackground) * camera.Gain

    if newExposure:
        eDarkSignal = newExposure * eDarkSignal / imageStats.ExposureDurationSeconds
        eSkyglowSignal = newExposure * eSkyglowSignal / imageStats.ExposureDurationSeconds
        eTargetSignal = newExposure * eTargetSignal / imageStats.ExposureDurationSeconds

    totalSignal = eDarkSignal + eSkyglowSignal + eTargetSignal
    totalNoise = sqrt(totalSignal + camera.ReadNoise ** 2)
    targetSNR = eTargetSignal / totalNoise

    return round(targetSNR, 6)


def calculateStackingEffect(snr: float, frames: int) -> list[float]:
    """Calculates the effect stacking process has on the SNR. Stacking multiple images is known to improve the
    overall SNR of the final, stacked image.

    Args:
        snr (float): The SNR of a light frame
        frames (int): The number of theoretical frames that should get stacked

    Returns:
        list[float]: The SNRs for every new image that got stacked.
    """
    snrList = [round(sqrt(i + 1) * snr, 2) for i in range(frames)]
    return snrList


def __main():
    stats = ImageStatistics(2627, 2561, 1999, 1997, 300)
    cam = Camera(1, 1)
    percentages = [0.1, 0.25, 0.5, 0.75, 1, 1.5, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    snr = calculateSNR(stats, cam)
    print(snr)
    print(calculateStackingEffect(snr, 50))
    print([calculateSNR(stats, cam, int(stats.ExposureDurationSeconds * perc)) for perc in percentages])


if __name__ == "__main__":
    __main()
