const FaTranslation = () => {
  return {
    /**
     * @type {I18nDictionary}
     */
    messages: {
      //   direction: "rtl",
      /**
       * Other below: translation of different UI components of the editor.js core
       */
      ui: {
        blockTunes: {
          toggler: {
            "Click to tune": "برای تنظیم کلیک کنید",
            "or drag to move": "یا بکشید برای جابجایی",
          },
        },
        inlineToolbar: {
          converter: {
            "Convert to": "تبدیل به",
          },
        },
        toolbar: {
          toolbox: {
            Add: "اضافه کردن",
            "Convert to": "تبدیل به",
          },
        },
      },

      /**
       * Section for translation Tool Names: both block and inline tools
       */
      toolNames: {
        Text: "متن",
        Heading: "عنوان",
        List: "لیست",
        Warning: "هشدار",
        Checklist: "چک‌ لیست",
        Quote: "نقل قول",
        Code: "کد",
        Delimiter: "جداکننده",
        "Raw HTML": "HTML خام",
        Table: "جدول",
        Link: "لینک",
        Marker: "مارکر",
        Bold: "پررنگ",
        Italic: "کج",
        InlineCode: "کد درون‌خطی",
        "Unordered List": "لیست نامه‌ای",
        "Ordered List": "لیست شماره‌گذاری",
        Image: "تصویر",
        Columns: "ستون",
        Toggle: "منوی کشویی",
        "Break Line": "خط",
      },

      /**
       * Section for passing translations to the external tools classes
       */
      tools: {
        /**
         * Each subsection is the i18n dictionary that will be passed to the corresponded plugin
         * The name of a plugin should be equal the name you specify in the 'tool' section for that plugin
         */
        toggle: {
          "Empty toggle. Click or drop blocks inside":
            "تاگل خالی. برای قرار دادن بلوک‌ها کلیک کنید یا آنها را درون آن بیندازید",
        },
        quote: {
          "Align Left": "چپ",
          // "Align right": "راست",
          "Align Center": "مرکز",
        },
        image: {
          Caption: "توضیح",
          "With border": "با حاشیه",
          "Stretch image": "کشیدن تصویر",
          "With background": "با پس زمینه",
        },
        list: {
          Ordered: "لیست شماره‌گذاری",
          Unordered: "لیست نامه‌ای",
          Checklist: "چک‌ لیست",
        },
        header: {
          "Heading 1": "عنوان 1",
          "Heading 2": "عنوان 2",
          "Heading 3": "عنوان 3",
          "Heading 4": "عنوان 4",
          "Heading 5": "عنوان 5",
          "Heading 6": "عنوان 6",
        },
        warning: {
          // <-- 'Warning' tool will accept this dictionary section
          Title: "عنوان",
          Message: "پیام",
        },

        /**
         * Link is the internal Inline Tool
         */
        link: {
          "Add a link": "اضافه کردن لینک",
        },
        /**
         * The "stub" is an internal block tool, used to fit blocks that does not have the corresponded plugin
         */
        stub: {
          "The block can not be displayed correctly.":
            "بلوک نمی‌تواند به درستی نمایش داده شود",
        },
      },

      /**
       * Section allows to translate Block Tunes
       */
      blockTunes: {
        /**
         * Each subsection is the i18n dictionary that will be passed to the corresponded Block Tune plugin
         * The name of a plugin should be equal the name you specify in the 'tunes' section for that plugin
         *
         * Also, there are few internal block tunes: "delete", "moveUp" and "moveDown"
         */
        delete: {
          Delete: "حذف",
        },
        moveUp: {
          "Move up": "جابجایی به بالا",
        },
        moveDown: {
          "Move down": "جابجایی به پایین",
        },
      },
    },
  };
};

export default FaTranslation;