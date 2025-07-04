# esoteric-firefox-userscripts
A collection of esoteric userscripts for Firefox, mostly for personal use, but these might interest bug bounty hunters, security & vulnerability researchers, osint researchers, etc. Scripts tested with FireMonkey and the latest non-beta release of Firefox. Scripts are likely compatible with your favorite userscript manager like Tampermonkey and Violentmonkey. 


## Included Scripts

- **HTTPStatusChecker.js** – display HTTP status codes next to each link
- **HeaderAnalyzer.js** – inspect HTTP response headers for common issues
- **MelonHusk.js** – replace mentions of "Elon Musk" with random anagrams
- **SameOriginBypass.js** – highlight potential same-origin policy bypasses
- **UrlFractals.js** – draw a Mandelbrot fractal derived from the page URL
- **UrlQRCode.js** – toggle a QR code for the current page (Ctrl+Shift+Q)

# Disclaimer

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

The use of our Software and any associated materials (including but not limited to code, libraries, scripts, and examples) is at your own risk. By using our Software, you understand and agree that you are solely responsible for your actions and the consequences thereof. We expressly disclaim any liability or responsibility for any harm resulting from your use of our Software, and by using our Software, you agree to this disclaimer and our terms of use.

Our Software is intended to be used for legal purposes only. It is your responsibility to stay compliant with all the local, state, and federal laws and regulations applicable to you when using our Software. You agree not to use our Software in an illegal manner or to infringe on the rights of others. You agree that you will not use our Software to commit a crime, or to enable others to commit a crime.

We are not responsible for any harm or damage caused by your use of our Software. You agree to indemnify and hold harmless the authors, maintainers, and contributors of the Software for any and all claims arising from your use of our Software, your violation of this disclaimer, or your violation of any rights of a third party.

If you do not agree with this disclaimer, please do not use our Software. Your use of our Software signifies your agreement with this disclaimer.

This disclaimer is subject to change without notice, and it is your responsibility to review this disclaimer periodically to ensure you are aware of its terms.

## Testing

Run unit tests using Node.js:

```sh
npm test
```

