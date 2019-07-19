import lifeMethods from '../../mixins/lifeMethods';

const fetchInitData = async ({ store }) => {
  await store.dispatch('fetchHomeData');
};

export default {
  // mixins: [lifeMethods],
  asyncData: fetchInitData,
  methods: {
    handleChangeContent () {
      alert('content');
    }
  },
  computed: {
    content () {
      return this.$store.state.content;
    }
  },
  mounted () {
    let store = this.$store;
    fetchInitData({ store });
  }
};
