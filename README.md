
> Diese Seite bei [https://coding4coconut.github.io/pxt-lcd128x160-st7735s/](https://coding4coconut.github.io/pxt-lcd128x160-st7735s/) öffnen

## Beschreibung

Dieses PXT-Paket funktioniert als LCD-Display Treiber für LCD-Displays basierend auf dem ST7735-Chipsatz.
Ich verwende dazu das LCD-Display "1.8inch LCD Module" von waveshare. Wichtige Eckdaten des Displays:
   * Interface: SPI
   * LCD type: Farb-TFT (RBG-Farbschema)
   * Controller: ST7735S
   * Resolution: 128 x 160 (Pixel)

Details zum Display:
https://www.waveshare.com/wiki/1.8inch_LCD_Module#Underlying_hardware_interface_2

Diese Erweiterung basiert auf einer microbit-Erweiterung von joy-it - https://github.com/joy-it/pxt-RB-TFT1.8  
Diese microbit-Erweiterung läuft jedoch nicht auf dem Calliope mini.
Es wurden daher die Treiberanpassungen für den Callipe mini vorgenommen und eine neue PXT-Erweiterung erstellt.
U.a. wurden das PIN-Setting für die SPI-Signale sowie für CS (Chipselect) und DC (Command/Data-Line) angepasst, sowie die Initialisierung des Chipsatzes angepasst.
Weiterhin wurden Funktionen für die Festlegung eines Display-Offsets und der Display-Größe erstellt und das Farbschema korrigiert.

Der Calliope kommuniziert über ein SPI-Interface mit dem LCD-Display.
Jedoch kommt es bei der Verwendung der SPI-Schnittstelle mit dem Calliope zu Problemen.
Insbesondere dann, wenn die SPI-Signalleitungen auf Pins liegen, welche auch von der 5x5-LED-Matrix benutzt werden.
Selbst das Ausschalten der 5x5-LED-Matrix führte zu keiner einwandfreien SPI-Kommunikation.

Um dennoch einen einwandfreien Betrieb der SPI-Schnittstelle zusammen mit dem LDC-Display zu ermöglichen, war es notwendig, folgende SPI-Belegung vorzunehmen:

*  SCK -> Pin P0 (SPI SCK)
*  SDA -> Pin P3 (SPI MOSI)  
*  CS  -> Pin P2 (Chipselect Signalleitung)
*  DC  -> Pin P1 (Data/Command Signalleitung)
*  SPI MISO -> belibig (da diese pxt-Paket keine Data-Read-Funktion des Displays benutzt)

## W I C H T I G !
Für einen einwandfreien Betrieb ist es daher unbedingt notwendig, die SPI-PINs in makecode im Start-Block zu initialisieren (vor der ersten Verwendung eines Blocks aus dieser PXT-Erweiterung).
Hier ein Beispiel:


![PXT-Init-SPI-Signallines](https://user-images.githubusercontent.com/91993589/174061301-2d2bacc9-7f0c-4daf-8586-45e0fc8e6a90.png)

Nutzen sie dazu aus der Block-Kategorie "Pins" -> "mehr"  den Block "SPI Pins einstellen".
Dieser Block muss ausgeführt werden, bevor das Display initialisiert wird, da ansonsten der Calliope mit dem Display nicht kommunizieren kann. 

## Schnittstelle Display-Calliope

Bei dem 1.8' LCD-Display von waveshare erfolgt die Schnittstellenbelegung wie folgt:

| LCD Modul     | Calliope     |
| ------------- |:------------:|
| VCC           | 3V           |
| GND           | GND          |
| CLK           | P0           |
| DIN           | P3           |
| DC            | P1           |
| RST           | 3V           |
| CS            | P2           |

## Color possibilities

All graphical objects (e.g. pixels, lines, rectangles) can be drawn in different colors. The following color options are available:

* Black
* Navy
* Dark Green
* Dark Cyan
* Maroon
* Purple
* Olive
* Light Grey
* Dark Grey
* Blue
* Green
* Cyan
* Red
* Magenta
* Yellow
* White
* Orange
* Green Yellow
* Pink

## Initialize display

The TFT display needs to be initialized before it is ready to use. All necessary TFT-Commands will be transfered via SPI here.
Before initialising the LCD Display with this function it is necessary to set the correponding SPI Signallines for the Calliope with Block "SPI Pins einstellen"
```typescript
// Initialize TFT Display
RBTFT18.init()
```

## Single pixels
Single pixels can be shown on the screen. The function takes three values. The x and y coordinates as well as the color for the pixel.

```typescript
// Draw a single red pixel
RBTFT18.drawPixel(10, 10, Color.Red)
```

## Straight lines
Straight lines can be drawn across the screen (horizontal, vertical and diagonal). The function takes five values: The x and y coordinates of the starting point, the x and y coordinates of the ending point and the color for the line.

```typescript
// Draw a straight blue line
RBTFT18.drawLine(0, 0, 100, 100, Color.Blue)
```

## Rectangles
Rectangles can be drawn on the screen. The function takes four five values: The x and y coordinate of the rectangles origin, the width of the rectangle, the height of the rectangle and the color for the rectangle.

```typescript
// Draw a yellow rectangle
RBTFT18.drawRectangle(0, 0, 100, 120, Color.Yellow)
```

## Circles
Circles can be drawn on the screen as well. Depending on the size of the circle, the drawing process can take a little more time than drawing straight lines or rectangles. The function takes four values: The x and y coordinate (center point) of the circle, the radius and the color of the circle.

```typescript
// Draw a green circle
RBTFT18.drawCircle(50, 50, 50, Color.Green)
```

## Show text
You can also show text on the display. The font size can be set in 5 different zoom levels (1-5). You can specify the font color as well as the background color. The function takes six arguments: The string, the x and y coordinates of the starting point, the zoom level, the text color and the background color.

```typescript
// Show white text with black background
RBTFT18.showString("Hello User!", 10, 10, 1, Color.White, Color.Black)
```

## Clear screen
New objects never replace already drawn objects on the screen. Instead, they are drawn in front of them. The clearScreen()-function will draw a black rectangle across the whole screen dimensions. The function does not expect any parameters.

```typescript
// Clear screen - replaces whole screen with a black rectangle
RBTFT18.clearScreen()
```

## Turn off display
You can turn off the display. In this mode, the frame memory is disabled and a blank (white) page will be shown. The function does not expect any parameters.

```typescript
// Turn off display
RBTFT18.turnOff()
```

## Turn on display
You turn the display on again and enable the output from the frame memory. The function does not expect any parameters.

```typescript
// Turn on display
RBTFT18.turnOn()
```

## Set size of display in pixel
The size of the display in horizontal direction varies between 128 an 132 pixels - depending on the used LCD-panel 
The size of the display in vertical direction varies between 160 an 162 pixels - depending on the used LCD-panel 

```typescript
// Set Display Size
// Set the display size to 128 x 160 pixel - horizontal: 128px vertical: 160px  (this is the default setting)
RBTFT18.setDisplaySize(128, 160)
```
## Set Pixel-Offset of display
In case the Display does not start to draw the first pixel at X=0 / Y=0, you can adjust a offset for X and Y direction.
This could happen, if the outer pixels of the LCD-panel are not connected or hidden by a covering frame that covers the edge of the LCD panel
The offset is statet as number of pixels

```typescript
// Set Pixel Offset
RBTFT18.setDisplayOffset(0, 0)
```
E.g. the 1.8 inch LCD Display from waveshare works fine with a x-offset = 2 and a y-offset = 1. 
This assumes the Set the display size is set to 128 x 160 pixels.


## Set normal or inverse display mode
The display facilitates to invert the color of all pixels 
In order to invert the color of all pixels set the paramenter to "AN" (or "ON")
In order to set the scheme back to normal set the parameter to "Aus" or ("off").

```typescript
// activate or deactivate the inverse mode of the display
RBTFT18.setDisplayInverseMode(ON)
```

## Adjust the color scheme (RGB or BGR)
The ST7735 chip ist able to adjust two color schemes, which meand color ordering - either RGB or BGR
In case your display shows a blue color instead of a red color, you should make use of this block an change the color sheme to BGR

```typescript
// adjust the color ordering of the display to RBG
RBTFT18.setColorScheme(RGB)
```


## Laufzeitumgebung zur Erstellung dieser Erweiterung
Diese Erweiterung wurde mit folgenden Versionen des MakeCode-Editors und Laufzeitumgebung erstellt und getestet:
*makecode.calliope.cc Version:  4.0.25
*Microsoft MakeCode Version:  7.0.16
*Laufzeitumgebung calliope Version:  v2.2.0-rc6-calliope.rc3-iss0.3

## Als Erweiterung verwenden

Dieses Repository kann als **Erweiterung** in MakeCode hinzugefügt werden.

* öffne [https://makecode.calliope.cc/](https://makecode.calliope.cc/)
* klicke auf **Neues Projekt**
* klicke auf **Erweiterungen** unter dem Zahnrad-Menü
* nach **https://github.com/coding4coconut/pxt-lcd-st7735-128x160_1v0** suchen und importieren



#### Metadaten (verwendet für Suche, Rendering)

* for PXT/calliopemini LCD 1.8 128x160 TFT waveshare 1.8inch LCD Module
<script src="https://makecode.com/gh-pages-embed.js"></script><script>makeCodeRender("{{ site.makecode.home_url }}", "{{ site.github.owner_name }}/{{ site.github.repository_name }}");</script>

## License
MIT License

See License-file

The core of this LCD-Dirver results from original code from https://github.com/joy-it/pxt-RB-TFT1.8  
MIT License  Copyright (c) 2021 Joy-IT powered by SIMAC Electronics GmbH
Thanks to joy-it for the great work! 

MIT License Copyright (c) 2022 Franz Stolz


## Dieses Projekt bearbeiten ![Build Status Abzeichen](https://github.com/coding4coconut/pxt-lcd-st7735-128x160_1v0/workflows/MakeCode/badge.svg)

Um dieses Repository in MakeCode zu bearbeiten.

* öffne [https://makecode.calliope.cc/](https://makecode.calliope.cc/)
* klicke auf **Importieren** und dann auf **Importiere URL**
* füge **https://github.com/coding4coconut/pxt-lcd-st7735-128x160_1v0** ein und klicke auf Importieren
