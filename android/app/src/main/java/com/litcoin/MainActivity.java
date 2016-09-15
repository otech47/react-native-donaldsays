package com.litcoin;

import com.facebook.react.ReactActivity;
import com.remobile.toast.RCTToastPackage;
import com.zmxv.RNSound.RNSoundPackage;
import cl.json.RNSharePackage;
import com.brentvatne.react.ReactVideoPackage;
import com.facebook.reactnative.androidsdk.FBSDKPackage;
import com.chirag.RNMail.RNMail;
import com.lwansbrough.ReactCamera.ReactCamera;
import com.AirMaps.AirPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;

import java.util.Arrays;
import java.util.List;

public class MainActivity extends ReactActivity {

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "litcoin";
    }

    /**
     * Returns whether dev mode should be enabled.
     * This enables e.g. the dev menu.
     */
    @Override
    protected boolean getUseDeveloperSupport() {
        return BuildConfig.DEBUG;
    }

    /**
     * A list of packages used by the app. If the app uses additional views
     * or modules besides the default ones, add more packages here.
     */
    @Override
    protected List<ReactPackage> getPackages() {
        return Arrays.<ReactPackage>asList(
            new MainReactPackage(),
            new RCTToastPackage(),
            new RNSoundPackage(),
            new RNSharePackage(),
            new ReactVideoPackage(),
            new FBSDKPackage(),
            new RNMail(),
            new ReactCamera(),
            new AirPackage(),
            new VectorIconsPackage(),
        new VectorIconsPackage()
        );
    }
}
