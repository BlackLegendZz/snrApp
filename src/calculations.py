from math import sqrt


def calculateSNR(data: dict[str, dict[str, int|float]], newExposure: int | None = None) -> float:
    """Calculates the Signal-to-Noise ratio of a lightframe based on information about the targets and backgrounds
    brightness, as well as camera settings and calibration frames.

    Args: imageStats (ImageStatistics): Information about the lightframe and calibration frames (dark and bias)
    camera (Camera): The used camera 
    newExposure (int | None, optional): Required to re-calculate the SNR based on an
    exposure different from the original one. Defaults to None.

    Returns:
        float: The Signal-to-Noise ratio of a light frame
    """
    if data["Light Frame"]["Background"] >= data["Light Frame"]["Target"]:
        return -1

    eDarkSignal = (data["Dark Frame"]["Background"] - data["Bias Frame"]["Background"]) * data["Camera"]["Gain"]
    eSkyglowSignal = (data["Light Frame"]["Background"] - data["Dark Frame"]["Background"]) * data["Camera"]["Gain"]
    eTargetSignal = (data["Light Frame"]["Target"]- data["Light Frame"]["Background"]) * data["Camera"]["Gain"]

    if newExposure:
        eDarkSignal = newExposure * eDarkSignal / data["Camera"]["Exposure"]
        eSkyglowSignal = newExposure * eSkyglowSignal / data["Camera"]["Exposure"]
        eTargetSignal = newExposure * eTargetSignal / data["Camera"]["Exposure"]

    totalSignal = eDarkSignal + eSkyglowSignal + eTargetSignal
    totalNoise = sqrt(totalSignal + data["Camera"]["Read Noise"] ** 2)
    targetSNR = eTargetSignal / totalNoise

    return round(targetSNR, 6)


def calculateStackingEffect(snr: float, frames: int) -> tuple[list[float], list[int]]:
    """Calculates the effect stacking process has on the SNR. Stacking multiple images is known to improve the
    overall SNR of the final, stacked image.

    Args:
        snr (float): The SNR of a light frame
        frames (int): The number of theoretical frames that should get stacked

    Returns:
        list[float]: The SNRs for every new image that got stacked.
    """
    snrList = [round(sqrt(i + 1) * snr, 2) for i in range(frames)]
    return snrList, list(range(frames))


def calculateSkyglowEffect(data: dict[str, dict[str, int|float]]) -> tuple[list[float], list[int]]:
    percs = list(range(10, 210, 10))
    skyglowSNR = []

    eDarkSignal = (data["Dark Frame"]["Background"] - data["Bias Frame"]["Background"]) * data["Camera"]["Gain"]
    eSkyglowSignal = (data["Light Frame"]["Background"] - data["Dark Frame"]["Background"]) * data["Camera"]["Gain"]
    eTargetSignal = (data["Light Frame"]["Target"]- data["Light Frame"]["Background"]) * data["Camera"]["Gain"]
        
    for change in percs:
        eNewSkyglowSignal = eSkyglowSignal * change / 100
        totalSignal = eDarkSignal + eNewSkyglowSignal + eTargetSignal
        totalNoise = sqrt(totalSignal + data["Camera"]["Read Noise"] ** 2)
        targetSNR = eTargetSignal / totalNoise
        skyglowSNR.append(targetSNR)
    return skyglowSNR, percs
