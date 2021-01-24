import * as cdk from "@aws-cdk/core";
import {IVpc} from "@aws-cdk/aws-ec2";
import {ICluster} from "@aws-cdk/aws-ecs";
import ec2 = require('@aws-cdk/aws-ec2');
import ecs = require('@aws-cdk/aws-ecs');

export interface EcsBlueGreenClusterProps {
    readonly cidr?: string;
}

export class EcsBlueGreenCluster extends cdk.Construct {

    public readonly vpc: IVpc;
    public readonly cluster: ICluster;

    constructor(scope: cdk.Construct, id: string, props: EcsBlueGreenClusterProps = {}) {
        super(scope, id);

        this.vpc = new ec2.Vpc(this, 'ecsClusterVPC', {
            cidr: props.cidr
        });
        this.cluster = new ecs.Cluster(this, 'ecsCluster', {
            vpc: this.vpc,
            containerInsights: true
        });
    }
}
