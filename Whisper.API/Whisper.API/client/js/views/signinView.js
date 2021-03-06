Whisper.SigninView = Backbone.View.extend({
  loginForm: undefined,
  events: {
    "submit #login-form form" : "submitLoginForm",
  },
  initialize: function(){
    _.extend(this, Backbone.Events);
    this.template = _.template($('#signin-template').html());
  },
  render: function(){
    var output = this.template({
      signin_uri: "http://whisper.apphb.com/api/signin"
    });
    $(this.el).html(output);
    this.loginForm = $("#login-form");
    return this;
  },
  submitLoginForm: function(event){
    var data, self = this;
    event.preventDefault();
    formData = this.validateFormInput();
    if(formData){
      $.ajax({
        url: "http://whisper.apphb.com/api/signin",
        type: "POST",
        context: self,
        cache: false,
        dataType: 'json',
        data: formData
      })
      .done(this.signinSuccessful)
      .fail(this.signinFailure);
    } else {
      this.signinFailure();
    }
  },
  validateFormInput: function(){
    var form, formData, i, inputField, fieldName, query, valid;
    form = $("#login-form form");
    formData = form.serializeArray();
    valid = true;
    for(i = 0; i < formData.length; i++){
      field_name = formData[i].name;
      query = "input[name="+field_name+"]";
      inputField = $(query, form);
      if(formData[i].value.length === 0){
        inputField.addClass("invalid");
        valid = false;
      }else{
        if(inputField.hasClass("invalid")){
          inputField.removeClass("invalid");
        }
      }
    }
    if(valid){
      return formData;
    }
  },
  signinSuccessful: function(results){
    if(results){
      Whisper.app.currentUser.accessToken = results.EncodedAuthToken;
      Whisper.app.currentUser.id = results.UserId;
      results = jQuery.parseJSON(results.User);
      Whisper.app.currentUser.student = new Whisper.Student(results.users[0]);
      //this.remove();
      Whisper.app.router.navigate('#/main', {trigger: true});
    }
  },
  signinFailure: function(failure){
    if(!this.isLoginFailureVisible()){
      this.isLoginFailureVisible(true);
    }
  },
  isLoginFailureVisible: function(isLoginFailureVisible){
   var error_message = $('div#login-error-message');
    if(typeof isLoginFailureVisible === 'undefined'){
      return !error_message.hasClass("hidden");
    } else {
      error_message[isLoginFailureVisible ? 'removeClass' : 'addClass']('hidden');
    }
  }
});
