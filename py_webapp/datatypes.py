from dataclasses import dataclass


@dataclass(frozen=True)
class Camera:
    Gain: float
    ReadNoise: int


@dataclass(frozen=True)
class ImageStatistics:
    TargetSignal: float
    SkyglowBackground: float
    DarkSignal: float
    BiasSignal: float
    ExposureDurationSeconds: int
