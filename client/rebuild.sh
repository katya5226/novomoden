rm -r build
npm run build
rm -r ../frontend/build
cp -R build ../frontend