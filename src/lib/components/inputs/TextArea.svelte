<script lang="ts">
    import InputErrorMessage from "../errorMessages/InputErrorMessage.svelte";
    export let placeholder: string;
    export let inputID: string;
    export let inputName: string;
    export let inputLabel: boolean;
    export let textareaInputValue: string;
    export let isValid: boolean;
    export let textAreaInputErrorMessage: string = "";
    export let required: boolean;
    let errorMessage: string = "";

    let textAreaInputTouched: boolean = false;

    const textareaInputValueChangedHandler = () => {
        if (required) {
            if (textAreaInputTouched) {
                if (textareaInputValue === "") {
                    isValid = false;
                    errorMessage = textAreaInputErrorMessage;
                } else if (textareaInputValue !== "") {
                    isValid = true;
                };
            } else if (!textAreaInputTouched) {
                isValid = true;
            };
        };
    };

    const textareaInputFocusChangedHandler = () => {
        if (required) {
            if (textAreaInputTouched) {
                if (textareaInputValue === "") {
                    isValid = false;
                    errorMessage = textAreaInputErrorMessage;
                };
            } else if (!textAreaInputTouched) {
                isValid = true;
            };
        };
    };

    
    const textareaInputBlurChangedHandler = () => {
        if (required) {
            textAreaInputTouched = true;

            if (textareaInputValue === "") {
                isValid = false;
                errorMessage = textAreaInputErrorMessage;
            } else if (textareaInputValue !== "") {
                isValid = true;
            };
        };
    };

  </script>
  <div class="input_and_label_container">
    {#if inputLabel !== false}
        <div class="input_label">
            <label for={inputID} >
                <slot />
            </label>
        </div>
    {/if}
    <textarea 
        class={isValid ? "textarea" : "invalid_textarea"}
        placeholder={placeholder}
        id={inputID}
        name={inputName}
        bind:value={textareaInputValue}
        on:input={textareaInputValueChangedHandler}
        on:focus={textareaInputFocusChangedHandler}
        on:blur={textareaInputBlurChangedHandler}
    />
    {#if (!isValid)}
        <InputErrorMessage>
            {errorMessage}
        </InputErrorMessage>
    {/if}
  </div>
  
  
  <style>

    .input_and_label_container {
        display: flex;
        flex-direction: column;
        width: 100%;
    }
  
      label {
          font-size: 1.4rem;
          font-weight: 600;
          color: #1C2226;
      }
  
      .input_label {
          padding: 0 0 0.5rem 0;
      }
      
      .textarea {
          background-color: #EFF9F2;
          border-radius: 1rem;
          color: #484B47;
          font-size: 1.4rem;
          padding: 0.5rem 1rem;
          border-width: 2px;
          border-color: #EFF9F2;
          border-style: solid;
          transition: border-color 0.2s linear;
          outline: none;
          width: 100%;
          height: 15rem;
      }

      .invalid_textarea {
          background-color: #EFF9F2;
          border-radius: 1rem;
          color: #484B47;
          font-size: 1.4rem;
          padding: 0.5rem 1rem;
          border-width: 2px;
          border-color: #9F1D20;
          border-style: solid;
          transition: border-color 0.2s linear;
          outline: none;
          width: 100%;
          height: 15rem;
      }
  
      .textarea:hover {
          border-color: #CB6D44;
          transition: border-color 0.2s linear;
      }
  
      .textarea:focus {
          border-color: #1C2226;
          transition: border-color 0.2s linear;
      }
  
      ::placeholder {
          color: #484B47;
          opacity: 50%; /* Firefox */
      }
  
      @media (max-width: 1440px) {

        .textarea {
              font-size: 1.2rem;
        }

        .invalid_textarea {
            font-size: 1.2rem;
        }
  
        label {
            font-size: 1.2rem;
        }
  
        .input_label {
            padding: 0 0 0.4rem 0;
        }
        
      }
  
      @media (max-width: 720px) {

        .textarea {
            font-size: 1rem;
        }

        .invalid_textarea {
            font-size: 1rem;
        }

        label {
            font-size: 1rem;
        }

        .input_label {
            padding: 0 0 0.3rem 0;
        }

      }
  
  </style>