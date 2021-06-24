class FormBlock {
  constructor(
    field_id_names,
    max_elems,
    wrapper_class,
    wrapper_id_base,
    remove_button_class,
    remove_button_id,
    add_button_id,
    datepicker_format = {}
  ) {
    this.$block = $();
    this.id_names = field_id_names;
    this.removed_index = [];
    this.current_index = 1;
    this.total_elems = 1;
    this.max_elems = max_elems;
    this.wrapper_class = wrapper_class;
    this.wrapper_id_base = wrapper_id_base;
    this.remove_button_class = remove_button_class;
    this.remove_button_id = remove_button_id;
    this.add_button_id = add_button_id;
    this.datepicker_format = datepicker_format;

    $(`#${this.add_button_id}`).on("click", () => {
      this.addFormBlock();
    });
    
    this.bindRemoveButton(1);

    //Initialize JQuery Datepicker
    applyDatepicker($(`#${this.wrapper_id_base}1`), this.datepicker_format);
  }

  bindRemoveButton = (index) => {
    $(`#${this.remove_button_id}${index}`).on("click", () => {
      this.removeFormBlock(index);
    });
  };

  addFormBlock = () => {
    var n;
    if (this.total_elems >= this.max_elems) {
      return;
    }
    ++this.total_elems;
    $("." + this.remove_button_class).css("display", "block");
    if (!(this.removed_index === undefined || this.removed_index.length == 0)) {
      n = this.removed_index.shift();
    } else {
      n = ++this.current_index;
    }
    this.$block = $("." + this.wrapper_class + ":last")
      .clone()
      .prop("id", this.wrapper_id_base + n);

    for (let id of this.id_names) {
      replaceId(this.$block, id, n);
    }
    this.$block.find(`[id*="${this.remove_button_id}"]`).prop("id", this.remove_button_id + n);
    applyDatepicker(this.$block, this.datepicker_format);
    $("." + this.wrapper_class + ":last").after(this.$block);
    this.bindRemoveButton(n);
  };

  removeFormBlock = (index) => {
    if (this.total_elems <= 1) {
      return;
    }
    this.removed_index.push(index);
    --this.total_elems;
    $("#" + this.wrapper_id_base + index).remove();

    if (this.total_elems <= 1) {
      $("." + this.remove_button_class).css("display", "none");
    }
  };
}

class FileUpload {
  constructor(file_upload_id_base, add_button_id) {
    this.add_button = add_button_id;
    this.upload_id_base = file_upload_id_base;
    this.counter = 1;

    $(`#${this.add_button}`).on("click", () => {
      this.addFileUpload();
    });
  }

  addFileUpload = () => {
    if (this.counter >= 10) {
      return;
    } else if (this.counter == 9) {
      $(`#${this.add_button}`).css("display", "none");
    }
    ++this.counter;
    $(`.file-upload#${this.upload_id_base}${this.counter}`).removeClass("hidden");
  };
}

function applyDatepicker($jQueryObject, datepicker_format) {
  $jQueryObject.find(".datepicker").removeClass("hasDatepicker").datepicker(datepicker_format);
}

function replaceId($block, id, idx) {
  var $temp = $block.find(`[id*=${id}]`);
  $temp.prop({ id: id + idx, name: id + idx });
  $temp.attr("data-name", id + idx);
  if ($temp.is("input")) {
    if ($temp.is(":radio") || $temp.is(":checkbox")) {
      $temp.prop("checked", false);
    } else {
      $temp.val("");
    }
  }
  else if($temp.is("textarea")) {
    $temp.val("");
  }
}

function linkLabels() {
  $("input").each(function () {
    $(this).siblings("label").prop("for", this.name);
    $(`.fieldset`).each(function () {
      $(this).changeElementType("fieldset");
    });
    $(`.legend`).each(function () {
      $(this).changeElementType("legend");
    });
  });
}

function radioShow(radio_name, show_class){
  $(`input[type=radio][name=${radio_name}]`).change(function () {
      if(this.value == "Yes"){
          $(`${show_class}`).css("display", "block");
          disableElement(`${show_class}`, false);
      }
      else{
          $(`${show_class}`).css("display", "none");
          disableElement(`${show_class}`, true);
      }
  });
}

var default_datepicker = {
  dateFormat: "dd/mm/y",
  changeMonth: true,
  changeYear: true,
  maxDate: "0",
};

//Code below by Andrew Whitaker
(function ($) {
  $.fn.changeElementType = function (newType) {
    var attrs = {};

    $.each(this[0].attributes, function (idx, attr) {
      attrs[attr.nodeName] = attr.nodeValue;
    });

    this.replaceWith(function () {
      return $("<" + newType + "/>", attrs).append($(this).contents());
    });
  };
})(jQuery);
