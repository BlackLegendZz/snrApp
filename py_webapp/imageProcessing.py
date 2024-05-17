import numpy as np

from py_webapp.datatypes import ImageStatistics


def basicStretch(img: np.ndarray) -> np.ndarray:
    """Performs a basic linear stretch on an image, usually clipping parts of the highlights.

    Args:
        img (np.ndarray): A 2D monochrome or colour image

    Returns:
        np.ndarray: The same image but now stretched
    """
    mean = img.mean()
    std = 3*img.std()

    minval = np.max([img.min(), mean-std])
    maxval = np.min([img.max(), mean+std])

    imgStretch = np.clip(img, minval, maxval)
    return imgStretch


def getBasicImageData(img: np.ndarray) -> dict:
    return {
        'Min:': np.min(img),
        'Max:': np.max(img),
        'Mean:': np.mean(img),
        'Median': np.median(img),
        'Stdev:': np.std(img)
    }


def ImageStats(
        imgLight: np.ndarray, 
        imgDark: np.ndarray, 
        imgBias: np.ndarray, 
        rectTarget: np.ndarray, 
        rectSkyglow: np.ndarray, 
        exposureInSeconds: int) -> ImageStatistics:
    """Calculates the mean of a dark and bias frame, as well as the mean of two subframes of a light frame which are calculated based on the given `rect` variables.

    Args:
        imgLight (np.ndarray): A 2D light frame, either monochrome or colour
        imgDark (np.ndarray): A 2D dark frame
        imgBias (np.ndarray): A 2D bias frame
        rectTarget (np.ndarray): A 2D array with the coordinates of a subframe for the main target of the light frame       
        rectSkyglow (np.ndarray): A 2D array with the coordinates of a subframe for an an "empty" background part of the lightframe
        exposureInSeconds (int): The exposure of the lightframe

    Returns:
        ImageStatistics: An object containing the caluclated statistics.
    """
    imgTarget = __getSubframe(imgLight, rectTarget)
    imgSkyglow = __getSubframe(imgLight, rectSkyglow)

    stats = ImageStatistics(
        TargetSignal=imgTarget.mean(),
        SkyglowBackground=imgSkyglow.mean(),
        DarkSignal=imgDark.mean(),
        BiasSignal=imgBias.mean(),
        ExposureDurationSeconds=exposureInSeconds
    )
    return stats


def __getSubframe(img: np.ndarray, rect: np.ndarray) -> np.ndarray:
    """Calculates a subframe of an image, based on coordinates given in `rect`

    Args:
        img (np.ndarray): A 2D monochrome or colour image
        rect (np.ndarray): a 2D array with the coordinates of the subframe

    Returns:
        np.ndarray: The trimmed image
    """
    if rect.shape != (2,2):
        raise AttributeError(f"Rectangle must be of shape (2, 2). Got {rect.shape}.")
    p1, p2 = rect

    imgTrim = img[p1[0]:p2[0], p1[1]:p2[1]]
    return imgTrim
