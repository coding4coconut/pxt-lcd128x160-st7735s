// Hier kann man Tests durchführen; diese Datei wird nicht kompiliert, wenn dieses Paket als Erweiterung verwendet wird.
/*
input.onButtonPressed(Button.A, function () {
    RBTFT18.drawCircle(
    60,
    60,
    25,
    Color.Yellow
    )
    RBTFT18.showString(
    "HELLO TEACHER",
    10,
    10,
    1,
    Color.Yellow,
    Color.Black
    )
})
input.onButtonPressed(Button.AB, function () {
    RBTFT18.showString(
    "SONNE",
    60,
    60,
    2,
    Color.Black,
    Color.Yellow
    )
    RBTFT18.showString(
    "MEER",
    50,
    140,
    2,
    Color.Black,
    Color.Blue
    )
})
input.onButtonPressed(Button.B, function () {
    RBTFT18.drawRectangle(
    5,
    125,
    125,
    40,
    Color.Blue
    )
    RBTFT18.setDisplayInverseMode(true)
    basic.pause(500)
    RBTFT18.setDisplayInverseMode(false)
    RBTFT18.setColorScheme(ColorScheme.BGR)
})


*/

pins.spiPins(DigitalPin.P3, DigitalPin.C16, DigitalPin.P0)
RBTFT18.setDisplayOffset(2, 1)
RBTFT18.init()
RBTFT18.clearScreen()
RBTFT18.showString(
"HAPPY DAY",
0,
0,
1,
Color.Red,
Color.Black
)
basic.showIcon(IconNames.Happy)


basic.forever(function () {
	
})

