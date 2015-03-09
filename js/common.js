/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

var app_call_number = '847-886-1401';
var app_email_address = 'tgarbrecht@kelmscott.com';


var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

app.initialize();

function action_call()
{
    var PhoneNumberLink = 'tel:' + app_call_number;

    if (PhoneNumberLink != 'tel:')
    {
        window.open(PhoneNumberLink, '_system');
    }
}

function action_claim()
{
    window.location = 'claim.html';
}

function action_settings()
{
    window.location = 'settings.html';
}

function RequiredField(value, message)
{
    var result = true;

    if (value == '')
    {
        alert(message);
        result = false;
    }

    return result;
}


////////////////////////////////////////////////////////////////////////////////////////////////////
//  Claim Form
////////////////////////////////////////////////////////////////////////////////////////////////////
function claim_load() {
    var permanentStorage = window.localStorage;
    document.getElementById('ClaimNumber').value = permanentStorage.getItem('Claim_ClaimNumber');
    document.getElementById('InsuredName').value = permanentStorage.getItem('Claim_InsuredName');
    document.getElementById('PermanentAddress').value = permanentStorage.getItem('Claim_PermanentAddress');
    document.getElementById('ContactNumber').value = permanentStorage.getItem('Claim_ContactNumber');
    document.getElementById('NumberOfAdults').value = permanentStorage.getItem('Claim_NumberOfAdults');
    document.getElementById('NumberOfChildren').value = permanentStorage.getItem('Claim_NumberOfChildren');
    document.getElementById('NumberOfPets').value = permanentStorage.getItem('Claim_NumberOfPets');
    document.getElementById('SpecialConsiderations').value = permanentStorage.getItem('Claim_SpecialConsiderations');
    document.getElementById('PolicyLimits').value = permanentStorage.getItem('Claim_PolicyLimits');
    document.getElementById('AdditionalInformation').value = permanentStorage.getItem('Claim_AdditionalInformation');
}

function claim_save_worker()
{
    var permanentStorage = window.localStorage;
    permanentStorage.setItem('Claim_ClaimNumber', document.getElementById('ClaimNumber').value);
    permanentStorage.setItem('Claim_InsuredName', document.getElementById('InsuredName').value);
    permanentStorage.setItem('Claim_PermanentAddress', document.getElementById('PermanentAddress').value);
    permanentStorage.setItem('Claim_ContactNumber', document.getElementById('ContactNumber').value);
    permanentStorage.setItem('Claim_NumberOfAdults', document.getElementById('NumberOfAdults').value);
    permanentStorage.setItem('Claim_NumberOfChildren', document.getElementById('NumberOfChildren').value);
    permanentStorage.setItem('Claim_NumberOfPets', document.getElementById('NumberOfPets').value);
    permanentStorage.setItem('Claim_SpecialConsiderations', document.getElementById('SpecialConsiderations').value);
    permanentStorage.setItem('Claim_PolicyLimits', document.getElementById('PolicyLimits').value);
    permanentStorage.setItem('Claim_AdditionalInformation', document.getElementById('AdditionalInformation').value);
}

function claim_save()
{
    if (RequiredField(document.getElementById('InsuredName').value, 'Insured name is required!'))
    {
        if (RequiredField(document.getElementById('ContactNumber').value, 'Contact number is required!'))
        {
            claim_save_worker();

            try {
                window.plugins.EmailComposer.showEmailComposerWithCallback(null, 'Claim Information', GetEmailBody(), [app_email_address], [], [], true, []);
            }
            catch (e) {
                alert('Error Sending Email!');
            }

            history.back();
        }
    }
}

function claim_clearform() {
    document.getElementById('ClaimNumber').value = '';
    document.getElementById('InsuredName').value = '';
    document.getElementById('PermanentAddress').value = '';
    document.getElementById('ContactNumber').value = '';
    document.getElementById('NumberOfAdults').value = '';
    document.getElementById('NumberOfChildren').value = '';
    document.getElementById('NumberOfPets').value = '';
    document.getElementById('SpecialConsiderations').value = '';
    document.getElementById('PolicyLimits').value = '';
    document.getElementById('AdditionalInformation').value = '';

    claim_save_worker();

    document.getElementById('ClaimNumber').focus();
}

function GetEmailBody() {
    var html = '<div style="width:400px;"><h1>Claim Information Submitted Via Mobile App:</h1><br/><br/>';

    html += GetFieldHTML('Name', 'Settings_Name');
    html += GetFieldHTML('Company', 'Settings_Company');
    html += GetFieldHTML('Phone', 'Settings_Phone');
    html += GetFieldHTML('Email', 'Settings_Email');
    html += GetFieldHTML('Claim Number', 'Claim_ClaimNumber');
    html += GetFieldHTML('Insured Name', 'Claim_InsuredName');
    html += GetFieldHTML('Permanent Address', 'Claim_PermanentAddress');
    html += GetFieldHTML('Contact Number', 'Claim_ContactNumber');
    html += GetFieldHTML('Number of Adults', 'Claim_NumberOfAdults');
    html += GetFieldHTML('Number of Children', 'Claim_NumberOfChildren');
    html += GetFieldHTML('Number of Pets', 'Claim_NumberOfPets');
    html += GetFieldHTML('Special Considerations', 'Claim_SpecialConsiderations');
    html += GetFieldHTML('Policy Limits', 'Claim_PolicyLimits');
    html += GetFieldHTML('Additional Information', 'Claim_AdditionalInformation');

    html += '</div>';

    return html;
}

function GetFieldHTML(title, id) {
    var html = "";

    html += '<div style="margin-bottom: 15px; font-family:Verdana, Geneva, sans-serif; font-size:12px;">';
    html += '    <b>' + title + ':</b> ' + window.localStorage.getItem(id);
    html += '</div>';

    return html;
}

////////////////////////////////////////////////////////////////////////////////////////////////////
//  Settings Form
////////////////////////////////////////////////////////////////////////////////////////////////////
function settings_load()
{
    var permanentStorage = window.localStorage;
    document.getElementById('Name').value = permanentStorage.getItem('Settings_Name');
    document.getElementById('Company').value = permanentStorage.getItem('Settings_Company');
    document.getElementById('Phone').value = permanentStorage.getItem('Settings_Phone');
    document.getElementById('Email').value = permanentStorage.getItem('Settings_Email');
}

function settings_save()
{
    if (RequiredField(document.getElementById('Name').value, 'Name is required!'))
    {
        if (RequiredField(document.getElementById('Company').value, 'Company name is required!'))
        {
            if (RequiredField(document.getElementById('Phone').value, 'Phone number is required!'))
            {
                var permanentStorage = window.localStorage;
                permanentStorage.setItem('Settings_Name', document.getElementById('Name').value);
                permanentStorage.setItem('Settings_Company', document.getElementById('Company').value);
                permanentStorage.setItem('Settings_Phone', document.getElementById('Phone').value);
                permanentStorage.setItem('Settings_Email', document.getElementById('Email').value);
                history.back();
            }
        }
    }
}

