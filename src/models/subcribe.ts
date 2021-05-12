import mongoose from 'mongoose';

interface SubcribeAttrs {
  departlist: string[];
  userId: string;
}

interface SubcribeDoc extends mongoose.Document {
  departlist: string[];
  userId: string;
}

interface SubcribeModel extends mongoose.Model<SubcribeDoc> {
  build(attrs: SubcribeAttrs): SubcribeDoc;
}

const SubcribeSchema = new mongoose.Schema(
  {
    departlist: [{
      type: String,
      required: true,
    }],
    userId: {
      type: String,
      required: true,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  }
);

SubcribeSchema.statics.build = (attrs: SubcribeAttrs) => {
  return new Subcribe(attrs);
};

const Subcribe = mongoose.model<SubcribeDoc, SubcribeModel>('Subcribe', SubcribeSchema);

export { Subcribe };
