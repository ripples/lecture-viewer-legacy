function CreateStoreMixin(stores) {
  var StoreMixin = {
    getInitialState: function() {
      return this.getStateFromStores(this.props);
    },

    componentDidMount: function() {
      for(store in stores) {
        store.addChangeListener(this.handleStoresChanged)
      }
      this.setState(this.getStateFromStores(this.props));
    },

    componentWillUnmount: function() {
      for(store in stores) {
        store.removeChangeListener(this.handleStoresChanged)
      }
    },

    handleStoresChanged: function() {
      if (this.isMounted()) {
        this.setState(this.getStateFromStores(this.props));
      }
    }
  };

  return StoreMixin;
}

module.exports = CreateStoreMixin;
