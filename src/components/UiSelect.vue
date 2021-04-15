/* eslint-disable */
<template>
  <Listbox class="w-full" as="div" v-model="modelValue">
    <div class="flex justify-between" v-if="cornerHint || label">
      <ListboxLabel class="block" :class="labelStyling">
        {{ label }}
      </ListboxLabel>

      <span
        class="text-sm text-gray-500"
        v-if="cornerHint"
        :class="cornerHintStyling"
        >{{ cornerHint }}</span
      >
    </div>
    <div
      :class="{
        'mt-1': cornerHint || label,
      }"
      class="relative"
    >
      <ListboxButton
        class="relative w-full cursor-default"
        :class="finalSelectedButtonStyling"
      >
        <span class="block truncate">{{
          modelValue ? modelValue.text : placeholder
        }}</span>
        <span
          class="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none"
        >
          <SelectorIcon
            class="h-5 w-5"
            :class="[{ 'text-red-300': invalid, 'text-gray-400': !invalid }]"
            aria-hidden="true"
          />
        </span>
      </ListboxButton>

      <transition
        leave-active-class="transition ease-in duration-100"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <ListboxOptions
          class="absolute mt-1 w-full overflow-auto"
          :class="[
            optionsBackgroundStyling,
            optionsHeightStyling,
            optionsRoundedStyling,
            optionsPaddingStyling,
            optionsTextStyling,
            optionsRingStyling,
          ]"
        >
          <ListboxOption
            as="template"
            v-for="option in options"
            :key="option.id"
            :value="option"
            v-slot="{ active, selected }"
          >
            <li
              :class="[
                active ? 'text-white bg-indigo-600' : 'text-gray-900',
                'cursor-default select-none relative py-2 pl-3 pr-9',
              ]"
            >
              <span
                :class="[
                  selected ? 'font-semibold' : 'font-normal',
                  'block truncate',
                ]"
              >
                {{ option.text }}
              </span>

              <span
                v-if="selected"
                :class="[
                  active ? 'text-white' : 'text-indigo-600',
                  'absolute inset-y-0 right-0 flex items-center pr-4',
                ]"
              >
                <CheckIcon class="h-5 w-5" aria-hidden="true" />
              </span>
            </li>
          </ListboxOption>
        </ListboxOptions>
      </transition>
      <p
        class="mt-2 text-sm"
        :class="finalHelpStyling"
        v-if="help || (invalid && error)"
      >
        {{ finalHelpText }}
      </p>
    </div>
  </Listbox>
</template>

<script>
import {
  Listbox,
  ListboxButton,
  ListboxLabel,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/vue";
import { CheckIcon, SelectorIcon } from "@heroicons/vue/solid";

export default {
  name: "UiSelect",
  components: {
    Listbox,
    ListboxButton,
    ListboxLabel,
    ListboxOption,
    ListboxOptions,
    CheckIcon,
    SelectorIcon,
  },

  props: {
    invalid: {
      type: Boolean,
      default: false,
    },
    placeholder: {
      type: String,
      required: false,
    },
    modelValue: {
      type: Object,
    },
    options: {
      type: Array,
    },
    cornerHint: {
      type: String,
      required: false,
    },
    cornerHintStyling: {
      type: String,
      default: "text-gray-500",
    },
    labelStyling: {
      type: String,
      default: "text-gray-700 text-sm font-medium",
    },
    selectedButtonBackgroundStyling: {
      type: String,
      default: "bg-white",
    },
    selectedButtonTextStyling: {
      type: String,
      default: "text-left sm:text-sm",
    },
    selectedButtonRoundedStyling: {
      type: String,
      default: "rounded-md",
    },
    selectedButtonBorderStyling: {
      type: String,
      default: "border border-gray-300",
    },
    selectedButtonShadowStyling: {
      type: String,
      default: "shadow-sm",
    },
    selectedButtonPaddingStyling: {
      type: String,
      default: "pl-3 pr-10 py-2",
    },
    selectedButtonFocusStyling: {
      type: String,
      default:
        "focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500",
    },
    optionsBackgroundStyling: {
      type: String,
      default: "bg-white",
    },
    optionsShadowStyling: {
      type: String,
      default: "shadow-lg",
    },
    optionsHeightStyling: {
      type: String,
      default: "max-h-60",
    },
    optionsRoundedStyling: {
      type: String,
      default: "rounded-md",
    },
    optionsPaddingStyling: {
      type: String,
      default: "py-1",
    },
    optionsTextStyling: {
      type: String,
      default: "text-base sm:text-sm",
    },
    optionsRingStyling: {
      type: String,
      default: "ring-1 ring-black ring-opacity-5 focus:outline-none",
    },
    label: {
      type: String,
      required: false,
    },
    error: {
      type: String,
      required: false,
    },
    helpStyling: {
      type: String,
      default: "text-gray-500",
    },
    help: {
      type: String,
      required: false,
    },
  },

  emits: ["update:modelValue"],

  computed: {
    finalSelectedButtonStyling() {
      var response = this.invalid
        ? this.classString(
            "border border-red-300 text-red-600 text-left sm:text-sm focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500"
          )
        : this.classString(this.selectedButtonBorderStyling) +
          this.classString(this.selectedButtonTextStyling) +
          this.classString(this.selectedButtonFocusStyling);

      return (
        response +
        this.classString(this.selectedButtonPaddingStyling) +
        this.classString(this.selectedButtonRoundedStyling) +
        this.classString(this.selectedButtonShadowStyling) +
        this.classString(this.selectedButtonBackgroundStyling)
      );
    },

    finalHelpStyling() {
      var response = this.invalid ? "text-red-600" : this.helpStyling;

      return this.classString(response);
    },

    finalHelpText() {
      return this.invalid ? this.error : this.help;
    },
  },

  methods: {
    classString(string) {
      return string + " ";
    },
  },
};
</script>