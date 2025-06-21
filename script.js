// This is the JavaScript extracted from the original python
    if ('serial' in navigator) {
      const scriptElement = document.createElement("script");
      scriptElement.src = "https://cdnjs.cloudflare.com/ajax/libs/xterm/3.14.5/xterm.min.js";
      document.body.appendChild(scriptElement);

      const linkElement = document.createElement("link");
      linkElement.rel = "stylesheet";
      linkElement.href = "https://cdnjs.cloudflare.com/ajax/libs/xterm/3.14.5/xterm.min.css";
      document.body.appendChild(linkElement);

      // Add Font Awesome for icons
      const fontAwesomeLink = document.createElement("link");
      fontAwesomeLink.rel = "stylesheet";
      fontAwesomeLink.href = "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css";
      document.head.appendChild(fontAwesomeLink);


      // Create the main container for the sidebar and terminal
      const mainContainer = document.createElement("div");
      mainContainer.style.display = "flex";
      document.querySelector("#output-area").appendChild(mainContainer);

      // Create the sidebar container
      const sidebarContainer = document.createElement("div");
      sidebarContainer.style.width = "250px"; // Fixed width
      sidebarContainer.style.minWidth = "250px"; // Prevent shrinking
      sidebarContainer.style.padding = "10px";
      sidebarContainer.style.borderRight = "1px solid #555"; // Darker border
      sidebarContainer.style.backgroundColor = "#222"; // Even darker grey background
      sidebarContainer.style.color = "#fff"; // White text for contrast
      mainContainer.appendChild(sidebarContainer);

      // Create the terminal container
      const terminalContainer = document.createElement("div");
      terminalContainer.style.flexGrow = "1";
      terminalContainer.style.padding = "10px";
      mainContainer.appendChild(terminalContainer);

      // Create the header container
      const headerContainer = document.createElement("div");
      headerContainer.style.display = "flex";
      headerContainer.style.alignItems = "center";
      headerContainer.style.padding = "10px";
      headerContainer.style.borderBottom = "1px solid #555"; // Darker border
      terminalContainer.appendChild(headerContainer);

      const connectDisconnectButton = document.createElement("button");
      connectDisconnectButton.innerHTML = '<i class="fas fa-plug"></i> Connect Port'; // Plug icon
      connectDisconnectButton.style.marginRight = "10px";
      connectDisconnectButton.style.borderRadius = "20px"; // Rounded corners
      connectDisconnectButton.style.padding = "8px 15px";
      connectDisconnectButton.style.backgroundColor = "#4CAF50"; // Green color
      connectDisconnectButton.style.color = "white";
      connectDisconnectButton.style.border = "none";
      connectDisconnectButton.style.cursor = "pointer";
      sidebarContainer.appendChild(connectDisconnectButton);


      const sendButton = document.createElement("button");
      sendButton.innerHTML = '<i class="fas fa-paper-plane"></i> Send'; // Paper plane icon
      sendButton.style.marginLeft = "10px";
      sendButton.style.borderRadius = "20px"; // Rounded corners
      sendButton.style.padding = "8px 15px";
      sendButton.style.backgroundColor = "#008CBA"; // Blue color
      sendButton.style.color = "white";
      sendButton.style.border = "none";
      sendButton.style.cursor = "pointer";
      headerContainer.appendChild(sendButton);

      const inputTextBox = document.createElement("input");
      inputTextBox.type = "text";
      inputTextBox.placeholder = "Enter text to send";
      inputTextBox.style.marginLeft = "10px"; // Add space between button and input
      inputTextBox.style.flexGrow = "1"; // Allow the input to take available space
      inputTextBox.style.padding = "8px";
      inputTextBox.style.borderRadius = "5px"; // Slightly rounded input corners
      inputTextBox.style.border = "1px solid #ccc";
      headerContainer.appendChild(inputTextBox);

      // Collapsible sections for the sidebar
      const infoSection = createCollapsibleSection("Print Info", sidebarContainer, true, '<i class="fas fa-info-circle" aria-hidden="true"></i>'); // Info icon
      const quickActionsSection = createCollapsibleSection("Quick Actions", sidebarContainer, false, '<i class="fas fa-bolt" aria-hidden="true"></i>'); // Save icon
      const powerSupplySection = createCollapsibleSection("Power Supply", sidebarContainer, false, '<i class="fa fa-sliders" aria-hidden="true"></i>'); // Power icon
      const specialSection = createCollapsibleSection("Experimental Features", sidebarContainer, false, '<i class="fas fa-bolt" aria-hidden="true"></i>'); // Bolt icon
      // -----------------------------------------------------------------------
      addButtonToSection('<i class="fa fa-list" aria-hidden="true"></i> &nbsp; Show Menu', infoSection, async () => {
         if(writer !== undefined) {
            const encoder = new TextEncoder();
            const text = "m\\n"; // Placeholder command
            writer.write(encoder.encode(text));
         }
      });
      addButtonToSection('<i class="fa fa-link" aria-hidden="true"></i> &nbsp; Show Netlist', infoSection, async () => {
         if(writer !== undefined) {
            const encoder = new TextEncoder();
            const text = "n\\n"; // Placeholder command
            writer.write(encoder.encode(text));
         }
      });
      addButtonToSection('<i class="fas fa-microchip" aria-hidden="true"></i> &nbsp; GPIO State', infoSection, async () => {
         if(writer !== undefined) {
            const encoder = new TextEncoder();
            const text = "g\\n"; // Placeholder command
            writer.write(encoder.encode(text));
         }
      });
      addButtonToSection('<i class="fas fa-chart-line" aria-hidden="true"></i> &nbsp; ADC Readings', infoSection, async () => {
         if(writer !== undefined) {
            const encoder = new TextEncoder();
            const text = "v\\n"; // Placeholder command
            writer.write(encoder(text));
         }
      });
      addButtonToSection('<i class="fas fa-play-circle" aria-hidden="true"></i> &nbsp; Show Startup Animation', infoSection, async () => { // Updated icon
         if(writer !== undefined) {
            const encoder = new TextEncoder();
            const text = "'\\n";
            writer.write(encoder.encode(text));
         }
      });
      addButtonToSection('<i class="fas fa-list-alt" aria-hidden="true"></i> &nbsp; List Slots (s)', infoSection, async () => {
         if(writer !== undefined) {
            const encoder = new TextEncoder();
            const text = "s\\n";
            writer.write(encoder.encode(text));
         }
      });
      addButtonToSection('<i class="fas fa-braille" aria-hidden="true"></i> &nbsp; Show Crossbar Status', infoSection, async () => { // Updated icon
         if(writer !== undefined) {
            const encoder = new TextEncoder();
            const text = "c\\n";
            writer.write(encoder.encode(text));
         }
      });
      addButtonToSection('<i class="fas fa-bars" aria-hidden="true"></i> &nbsp; Show Bridge Array', infoSection, async () => { // Updated icon
         if(writer !== undefined) {
            const encoder = new TextEncoder();
            const text = "b\\n";
            writer.write(encoder.encode(text));
         }
      });
      addButtonToSection('<i class="fas fa-info-circle" aria-hidden="true"></i> &nbsp; Firmware Version', infoSection, async () => {
         if(writer !== undefined) {
            const encoder = new TextEncoder();
            const text = "?\\n"; // Placeholder command
            writer.write(encoder.encode(text));
         }
      });
      // -----------------------------------------------------------------------
      // Add buttons to Quick Actions section
      addButtonToSection('<i class="fas fa-tv" aria-hidden="true"></i> &nbsp; Connect OLED?', quickActionsSection, async () => {
        const myCheckboxValue = myCheckbox.checked;
        console.log(myCheckboxValue); // debug code
        if(writer !== undefined) {
          const encoder = new TextEncoder();
          if (myCheckboxValue) { // Checkbox is checked
            //console.log('Checkbox is checked'); // debug code
            const text = ".\\n";
            writer.write(encoder.encode(text));
          } else { // Checkbox is unchecked
            //console.log('Checkbox is unchecked'); // debug code
            const text = ".\\n";
            writer.write(encoder.encode(text));
          }
        }
      }, 'checkbox'); // Using checkbox type

      addButtonToSection('<i class="fas fa-link" aria-hidden="true"></i> &nbsp; Connect UART?', quickActionsSection, async () => { // Updated icon
        const myCheckboxValue = myCheckbox.checked;
        console.log(myCheckboxValue); // debug code
        if(writer !== undefined) {
          const encoder = new TextEncoder();
          if (myCheckboxValue) { // Checkbox is checked
            //console.log('Checkbox is checked'); // debug code
            const text = "A\\n";
            writer.write(encoder.encode(text));
          } else { // Checkbox is unchecked
            //console.log('Checkbox is unchecked'); // debug code
            const text = "a\\n";
            writer.write(encoder.encode(text));
          }
        }
      }, 'checkbox'); // Using checkbox type

      addButtonToSection('<i class="fas fa-times-circle" aria-hidden="true"></i> &nbsp; Clear All Nets', quickActionsSection, async () => {
         if(writer !== undefined) {
            const encoder = new TextEncoder();
            const text = "x\\n"; // Placeholder command
            writer.write(encoder.encode(text));
         }
      });
      // addButtonToSection('<i class="fas fa-arrow-right" aria-hidden="true"></i> &nbsp; Next Slot (>)', quickActionsSection, async () => {
      //    if(writer !== undefined) {
      //       const encoder = new TextEncoder();
      //       const text = ">\\n";
      //       writer.write(encoder.encode(text));
      //    }
      // });
      addButtonToSection('<i class="fas fa-arrow-left" aria-hidden="true"></i> &nbsp; Prev. Slot (<)', quickActionsSection, async () => {
         if(writer !== undefined) {
            const encoder = new TextEncoder();
            const text = "<\\n";
            writer.write(encoder.encode(text));
         }
      });
      addButtonToSection('<i class="fa fa-search" aria-hidden="true"></i> &nbsp; Scan I2C (@)', quickActionsSection, async () => {
         if(writer !== undefined) {
            const encoder = new TextEncoder();
            const text = "@\\n";
            writer.write(encoder.encode(text));
         }
      });
      // -----------------------------------------------------------------------
      // Add sliders to Power Supply section
      addRangeSliderToSection('<i class="fas fa-arrow-up" aria-hidden="true"></i> &nbsp; Top Rail', powerSupplySection, -8, 8, 3.3, 0.01, async (value) => {
          if(writer !== undefined) {
            const encoder = new TextEncoder();
            const text = `\`[dacs]top_rail = ${value};\\n`; // Placeholder command
            writer.write(encoder.encode(text));
          }
      });
       addRangeSliderToSection('<i class="fas fa-arrow-down" aria-hidden="true"></i> &nbsp; Bottom Rail', powerSupplySection, -8, 8, 3.3, 0.01, async (value) => {
          if(writer !== undefined) {
            const encoder = new TextEncoder();
            const text = `\`[dacs]bottom_rail = ${value};\\n`; // Placeholder command
            writer.write(encoder.encode(text));
          }
      });
       addRangeSliderToSection('<i class="fas fa-wave-square" aria-hidden="true"></i> &nbsp; DAC 0', powerSupplySection, -8, 8, 3.3, 0.01, async (value) => {
          if(writer !== undefined) {
            const encoder = new TextEncoder();
            const text = `>dac(set, 0, ${value}, save=False)\\n`;
            writer.write(encoder.encode(text));
          }
      });
       addRangeSliderToSection('<i class="fas fa-wave-square" aria-hidden="true"></i> &nbsp; DAC 1', powerSupplySection, -8, 8, 3.3, 0.01, async (value) => {
          if(writer !== undefined) {
            const encoder = new TextEncoder();
            const text = `>dac(set, 1, ${value}, save=False)\\n`;
            writer.write(encoder.encode(text));
          }
      });
      // -----------------------------------------------------------------------
      // Add buttons to Special section
      addButtonToSection('<i class="fa fa-table" aria-hidden="true"></i> &nbsp; Display Connections?', specialSection, async () => {
        const myCheckboxValue = myCheckbox.checked;
        //console.log(myCheckboxValue); // debug code
        if(writer !== undefined) {
          const encoder = new TextEncoder();
          if (myCheckboxValue) { // Checkbox is checked
            //console.log('Checkbox is checked'); // debug code
            const text = "R\\n"; // Placeholder for OLED connect command
            writer.write(encoder.encode(text));
          } else { // Checkbox is unchecked
            //console.log('Checkbox is unchecked'); // debug code
            const text = "R\\n"; // Placeholder for OLED disconnect command
            writer.write(encoder.encode(text));
          }
        }
      }, 'checkbox'); // Using checkbox type

      addButtonToSection('<i class="fas fa-terminal" aria-hidden="true"></i> &nbsp; uPython REPL', specialSection, async () => { // Updated icon
         if(writer !== undefined) {
            const encoder = new TextEncoder();
            const text = "p\\n";
            writer.write(encoder.encode(text));
         }
      });
      addButtonToSection('<i class="fas fa-music" aria-hidden="true"></i> &nbsp; Take on Me (Probe Tip)', specialSection, async () => { // Updated icon
         if(writer !== undefined) {
            const encoder = new TextEncoder();
            const text = ">runapp(&quot;Take   on Me&quot;)\\n"; // TODO: placeholder command >runapp(&quot;Take   on Me&quot;)
            writer.write(encoder.encode(text));
         }
      });

      // -----------------------------------------------------------------------
      terminalDiv = document.createElement("div");
      terminalDiv.style = "margin: 5px";
      terminalContainer.appendChild(terminalDiv);

      let port = undefined;
      let reader = undefined;
      let writer = undefined;
      let keepReading = true;
      let term = undefined;
      let receivedText = "";

      // Helper function to create a collapsible section
      function createCollapsibleSection(title, parentElement, expanded = false, iconHtml = '') { // Added expanded parameter and iconHtml
          const container = document.createElement("div");
          container.style.border = "1px solid #555"; // Darker border
          container.style.marginTop = "10px";
          container.style.marginBottom = "10px";
          container.style.borderRadius = "5px"; // Rounded corners
          container.style.overflow = "hidden"; // Hide content overflow during collapse
          parentElement.appendChild(container);

          const header = document.createElement("div");
          header.style.backgroundColor = "#333"; // Dark grey header
          header.style.padding = "10px"; // Increased padding
          header.style.cursor = "pointer";
          header.style.fontWeight = "bold";
          header.style.display = "flex"; // Use flexbox for alignment
          header.style.alignItems = "center";
          container.appendChild(header);

          const iconSpan = document.createElement("span");
          iconSpan.innerHTML = iconHtml;
          iconSpan.style.marginRight = "8px"; // Space between icon and text
          header.appendChild(iconSpan);

          const titleSpan = document.createElement("span");
          titleSpan.textContent = title;
          header.appendChild(titleSpan);

          const content = document.createElement("div");
          content.style.padding = "8px";
          content.style.display = expanded ? "block" : "none"; // Set initial display based on expanded
          content.style.backgroundColor = "#222"; // Slightly lighter dark grey for content
          container.appendChild(content);

          header.onclick = () => {
              content.style.display = content.style.display === "none" ? "block" : "none";
          };

          return content; // Return the content div to add elements to it
      }

      // Helper function to add a button to a section
      function addButtonToSection(text, sectionElement, onclickHandler, type = 'button') {
        const buttonContainer = document.createElement("div"); // Use a container for better layout
        buttonContainer.style.marginTop = "5px";
        buttonContainer.style.marginBottom = "5px";
        sectionElement.appendChild(buttonContainer);

        if (type === 'button') {
          const button = document.createElement("button");
          button.innerHTML = text;
          button.style.width = "100%"; // Make button fill container
          button.style.padding = "8px";
          button.style.borderRadius = "10px"; // Rounded corners
          button.style.backgroundColor = "#555"; // Grey button
          button.style.color = "white";
          button.style.border = "none";
          button.style.cursor = "pointer";
          button.style.textAlign = "left"; // Left justify the text and icon
          button.onmouseover = function() { this.style.backgroundColor = '#777'; }; // Hover effect
          button.onmouseout = function() { this.style.backgroundColor = '#555'; };
          button.onclick = onclickHandler;
          buttonContainer.appendChild(button);
        } else if (type === 'checkbox') {
          const checkbox = document.createElement("input");
          checkbox.type = "checkbox";
          checkbox.style.marginRight = "5px"; // Space between checkbox and label

          const label = document.createElement('label');
          label.innerHTML = text; // Use innerHTML to render icons in label
          label.style.display = 'flex'; // Use flexbox for alignment
          label.style.alignItems = 'center'; // Vertically align icon and text

          buttonContainer.style.display = 'flex'; // Use flexbox for the container
          buttonContainer.style.alignItems = 'center'; // Vertically align checkbox and label

          buttonContainer.appendChild(checkbox);
          buttonContainer.appendChild(label);


          // Attach the onclick handler to the checkbox
          checkbox.onclick = onclickHandler;

          // Make the checkbox globally accessible if needed by the handler
          if (text.includes("Connect OLED?")) { // Check for part of the text
            window.myCheckbox = checkbox;
          }
        }
      }

      // Helper function to add a range slider to a section
      function addRangeSliderToSection(label, sectionElement, min, max, value, step, onchangeHandler) {
        const sliderContainer = document.createElement("div");
        sliderContainer.style.marginTop = "5px";
        sliderContainer.style.marginBottom = "5px";
        sectionElement.appendChild(sliderContainer);

        const labelElement = document.createElement("label");
        labelElement.innerHTML = label + ": "; // Use innerHTML for icon
        sliderContainer.appendChild(labelElement);

        // Add a number input for exact value
        const numberInput = document.createElement("input");
        numberInput.type = "number";
        numberInput.min = min;
        numberInput.max = max;
        numberInput.value = value;
        numberInput.step = step;
        numberInput.style.width = "60px"; // Adjust width as needed
        numberInput.style.marginRight = "5px"; // Space between input and slider
        numberInput.style.padding = "4px";
        numberInput.style.borderRadius = "3px";
        numberInput.style.border = "1px solid #ccc";
        sliderContainer.appendChild(numberInput);

        // Add a line break to place the slider below the label and input
        const br = document.createElement("br");
        sliderContainer.appendChild(br);

        const slider = document.createElement("input");
        slider.type = "range";
        slider.min = min;
        slider.max = max;
        slider.value = value;
        slider.step = step;
        slider.style.width = "225px"; // DO NOT CHANGE

        sliderContainer.appendChild(slider);

        // Sync slider and number input
        slider.oninput = (event) => {
          numberInput.value = parseFloat(event.target.value).toFixed(2);
        };

        numberInput.oninput = (event) => {
          slider.value = parseFloat(event.target.value);
        };


        // Transmit command on slider release (change event)
        slider.onchange = (event) => {
          const currentValue = parseFloat(event.target.value).toFixed(2);
          numberInput.value = currentValue; // Ensure number input is updated on change too
          onchangeHandler(currentValue);
        };

        // Transmit command on number input change
        numberInput.onchange = (event) => {
          const currentValue = parseFloat(event.target.value).toFixed(2);
          slider.value = currentValue; // Ensure slider is updated on change too
          onchangeHandler(currentValue);
        };
      }

      connectDisconnectButton.onclick = async () => {
        if (port !== undefined) {
          if (reader !== undefined) {
            keepReading = false;
            try {
              await reader.cancel();
            } catch (e) {}
          }
          if(writer !== undefined) {
            await writer.releaseLock();
          }
          port = undefined;
          reader = undefined;
          writer = undefined;
          connectDisconnectButton.innerHTML = '<i class="fas fa-plug"></i> Connect Port'; // Plug icon
          connectDisconnectButton.style.backgroundColor = "#4CAF50"; // Green color

          return;
        }

        port = await navigator.serial.requestPort();
        keepReading = true;

        connectDisconnectButton.innerHTML = '<i class="fas fa-times"></i> Disconnect Port'; // Times icon
        connectDisconnectButton.style.backgroundColor = "#f44336"; // Red color


        await port.open({ baudRate: {baud_rate} });

        if (term === undefined) {
          term = new Terminal({ rows: {term_h}, cols: {term_w} }); // Doubled rows and cols 48 & 160
          term.open(terminalDiv);
        } else {
          term.resize({term_w}, {term_h}); // Resize existing terminal
        }
        term.clear();
        writer = port.writable.getWriter();

        const decoder = new TextDecoder();

        // Send initial commands:
        if(writer !== undefined) {
          const encoder = new TextEncoder();
          const text = "E\\n m\\n"; // adding R\\n seems to cause issues and =\\n doesn't work... only the first command seems to get run
          writer.write(encoder.encode(text));
        }

        while (port && keepReading) {
          try {
            reader = port.readable.getReader();

            while (true) {
              const { value, done } = await reader.read();
              if (done) {
                keepReading = false;
                break;
              }

              term.write(decoder.decode(value, { stream: true }));
            }
          } catch (error) {
            keepReading = false;
            console.error("Serial read error:", error); // Log the error
             // Handle errors more gracefully, e.g., display an error message to the user
             term.write("\\n\\rSerial connection error: " + error.message + "\\n\\r");
          } finally {
            await reader.releaseLock();
            await writer.releaseLock();
          }
        }

        // Close the port
        await port.close();

        port = undefined;
        reader = undefined;
        writer = undefined;
        connectDisconnectButton.innerHTML = '<i class="fas fa-plug"></i> Connect Port'; // Plug icon
        connectDisconnectButton.style.backgroundColor = "#4CAF50"; // Green color
      };

      sendButton.onclick = async () => {
        if(writer !== undefined) {
          const encoder = new TextEncoder();
          const text = inputTextBox.value + "\\n";
          writer.write(encoder.encode(text));
          inputTextBox.value = "";
        }
      };

      // Handle Enter key press in input box
      inputTextBox.addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
          event.preventDefault(); // Prevent default form submission
          sendButton.click(); // Simulate button click
        }
      });


    } else {
      document.querySelector("#output-area").apipendChild(document.createTextNode(
        "Oh no! Your browser does not support Web Serial!"
      ));
    }
