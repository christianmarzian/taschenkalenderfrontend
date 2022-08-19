<template>
  <section class="section">
    <!-- Begin Mailchimp Signup Form -->
    <link
      href="//cdn-images.mailchimp.com/embedcode/classic-071822.css"
      rel="stylesheet"
      type="text/css"
    />

    <div id="mc_embed_signup">
      <form
        action="https://epical.us12.list-manage.com/subscribe/post?u=43f8d23de457b59395f653b41&amp;id=a2cac95d68&amp;f_id=00e3b6e0f0"
        method="post"
        id="mc-embedded-subscribe-form"
        name="mc-embedded-subscribe-form"
        class="validate"
		style="padding:0px;"
        target="_blank"
        novalidate
      >
        <div id="mc_embed_signup_scroll">
          <h2 class="subtitle is-2" style="font-weight:normal;margin:inherit;font-size:2em;">Prenumerera</h2>
          <div class="indicates-required">
            <span class="asterisk">*</span> obligatorisk
          </div>
          <div class="mc-field-group">
            <label class="label" for="mce-EMAIL"
              >E-post<span class="asterisk">*</span>
            </label>
            <input
              type="email"
              value=""
              name="EMAIL"
              class="required email"
              id="mce-EMAIL"
            />
            <span id="mce-EMAIL-HELPERTEXT" class="helper_text"></span>
          </div>
          <div class="mc-field-group field">
            <label class="label" for="mce-FNAME">Förnamn</label>
            <input type="text" value="" name="FNAME" class="" id="mce-FNAME" />
            <span id="mce-FNAME-HELPERTEXT" class="helper_text"></span>
          </div>
          <div class="mc-field-group">
            <label class="label" for="mce-LNAME">Efternamn</label>
            <input type="text" value="" name="LNAME" class="" id="mce-LNAME" />
            <span id="mce-LNAME-HELPERTEXT" class="helper_text"></span>
          </div>
          <div id="mce-responses" class="clear foot">
            <div
              class="response"
              id="mce-error-response"
              style="display: none"
            ></div>
            <div
              class="response"
              id="mce-success-response"
              style="display: none"
            ></div>
          </div>
          <!-- real people should not fill this in and expect good things - do not remove this or risk form bot signups-->
          <div style="position: absolute; left: -5000px" aria-hidden="true">
            <input
              type="text"
              name="b_43f8d23de457b59395f653b41_a2cac95d68"
              tabindex="-1"
              value=""
            />
          </div>
          <div class="optionalParent">
            <div class="clear foot">
              <input
                type="submit"
                value="att registrera"
                name="subscribe"
                id="mc-embedded-subscribe"
                class="button is-primary"
				style="font-weight:bold;font-size:1.2em;padding:6px 16px;;height:44px;background-color: #d1dcd4;color:#000;"
              />

            </div>
          </div>
        </div>
      </form>
    </div>
    <script
      type="text/javascript"
      src="//s3.amazonaws.com/downloads.mailchimp.com/js/mc-validate.js"
    ></script>
    <script type="text/javascript">
      (function ($) {
        window.fnames = new Array();
        window.ftypes = new Array();
        fnames[0] = "EMAIL";
        ftypes[0] = "email";
        fnames[1] = "FNAME";
        ftypes[1] = "text";
        fnames[2] = "LNAME";
        ftypes[2] = "text";
        fnames[3] = "ADDRESS";
        ftypes[3] = "address";
        fnames[4] = "PHONE";
        ftypes[4] = "phone";
        fnames[5] = "BIRTHDAY";
        ftypes[5] = "birthday";
      })(jQuery);
      var $mcj = jQuery.noConflict(true);
    </script>
    <!--End mc_embed_signup-->
  </section>
</template>

<script>
export default {
  name: 'ProductCard'
}
</script>