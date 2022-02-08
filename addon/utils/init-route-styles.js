import podNames from 'ember-component-and-route-css/pod-names';

export default function initRouteStyles(owner, routeNames) {
  const classes = [];
  for (let i = 0; i < routeNames.length; i++) {
    const routeName = routeNames[i];
    const currentPath = routeName.replace(/\./g, '/');
    const styleNamespace = podNames[`styles/${currentPath}`];

    if (styleNamespace) {
      classes.push(styleNamespace);

      const controller = owner.lookup(`controller:${routeName}`);
      if (controller) {
        controller.set('styleNamespace', styleNamespace);
      }
    }
  }

  let controller = owner
    .lookup('controller:application');

  if (controller) {
    controller.set('routeStyleNamespaceClassSet', classes.join(' '));
  }
}
