import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";



export declare class Meditation {
  readonly id: string;
  readonly text: string;
  constructor(init: ModelInit<Meditation>);
  static copyOf(source: Meditation, mutator: (draft: MutableModel<Meditation>) => MutableModel<Meditation> | void): Meditation;
}