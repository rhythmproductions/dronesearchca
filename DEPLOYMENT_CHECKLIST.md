# DroneSearch.ca - Deployment Checklist

## Pre-Deployment Review

✅ **Code Changes Completed**
- Form heading updated to "Request Founding Partner Information"
- Documentation files created (.env.example, SETUP.md, CHANGES_SUMMARY.md)
- Todo list updated with current status

✅ **Preview Testing**
- Development server running successfully
- Site accessible at preview URL
- All existing functionality working correctly

## Deployment Steps

### Step 1: Push to GitHub
Since you mentioned this is the GitHub version, the changes are ready to be committed and pushed:

```bash
cd /home/ubuntu/dronesearch-working
git add .
git commit -m "Update form heading and add environment variable documentation"
git push origin main
```

**Note:** This will automatically trigger a Netlify deployment.

### Step 2: Configure Netlify Environment Variables
After deployment completes:

1. Log into Netlify dashboard
2. Select your dronesearch.ca site
3. Go to **Site settings** → **Build & deploy** → **Environment variables**
4. Click **Add a variable**
5. Add the following:
   - **Key:** `VITE_FRONTEND_FORGE_API_KEY`
   - **Value:** [Contact Manus support or use your own Google Maps API key]
6. Click **Save**
7. Trigger a new deployment to apply the environment variable

### Step 3: Verify Deployment
After the new deployment completes:

- [ ] Visit dronesearch.ca
- [ ] Verify form heading displays "Request Founding Partner Information"
- [ ] Check that the Google Maps component displays correctly
- [ ] Test form submissions
- [ ] Check browser console for any errors

### Step 4: Monitor Google Analytics
Over the next 24-48 hours:

- [ ] Log into Google Analytics (https://analytics.google.com)
- [ ] Check **Realtime** reports for active users
- [ ] Verify events are being tracked
- [ ] Review user behavior in standard reports

## Alternative: Using Your Own Google Maps API Key

If you prefer to use your own Google Maps API key instead of the Manus Forge proxy:

1. Get a Google Maps API key from Google Cloud Console
2. Enable the following APIs:
   - Maps JavaScript API
   - Places API
   - Geocoding API
   - Geometry API
3. Modify `client/src/components/Map.tsx`:
   - Line 98: Replace with `script.src = \`https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&v=weekly&libraries=marker,places,geocoding,geometry\`;`
   - Remove/comment lines 89-93 (FORGE proxy config)
4. Add your API key to Netlify environment variables as `VITE_GOOGLE_MAPS_API_KEY`
5. Update the code to use this new variable

## Post-Deployment Monitoring

### Week 1
- Monitor form submissions in Netlify Forms dashboard
- Check Google Analytics daily for traffic patterns
- Verify all CTAs are tracking correctly
- Test on multiple devices and browsers

### Ongoing
- Review analytics weekly for user engagement
- Monitor conversion rates for founding partner inquiries
- Track which sections users engage with most
- Adjust content based on user behavior data

## Support Resources

- **Netlify Documentation:** https://docs.netlify.com
- **Google Analytics Help:** https://support.google.com/analytics
- **Google Maps API Documentation:** https://developers.google.com/maps/documentation

## Rollback Plan

If issues arise after deployment:

1. In Netlify dashboard, go to **Deploys**
2. Find the previous working deployment
3. Click **Publish deploy** to rollback
4. Investigate and fix issues locally
5. Redeploy when ready

---

**All systems ready for deployment!** 🚀
